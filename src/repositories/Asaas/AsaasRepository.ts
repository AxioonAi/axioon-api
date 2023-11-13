import { AsaasError } from "@/helper/errors/AsaasError";
import { createConnection } from "@/utils/asaas";
import { AsaasRepository, AsaasUserInterface } from "../asaasRepository";

export class AsaasProductionRepository implements AsaasRepository {
  async createUser(user: AsaasUserInterface) {
    const createData = {
      ...user,
      notificationDisabled: true,
    };
    const createUser = await createConnection("/customers", createData, "POST");

    if (createUser.status !== 200) {
      throw new AsaasError(createUser.body.errors[0].description);
    }

    return { id: createUser.body.id };
  }

  async recoverPayment(paymentId: string) {
    const [payment, qrCode] = await Promise.all([
      createConnection(`/payments/${paymentId}`, {}, "POST"),
      createConnection(`/payments/${paymentId}/pixQrCode`, {}, "POST"),
    ]);

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      value: payment.body.value,
      payment_id: paymentId,
      expirationDate: qrCode.body.expirationDate,
    };
  }

  async pixPayment(data: { customer: string; value: number }) {
    const paymentData = {
      billingType: "PIX",
      customer: data.customer,
      value: data.value,
      dueDate: new Date(),
    };

    const createPayment = await createConnection(
      "/payments",
      paymentData,
      "POST"
    );
    if (createPayment.status !== 200) {
      console.log(createPayment.body.errors[0]);
      throw new AsaasError(createPayment.body.errors[0].description);
    }

    const id = createPayment.body.id;
    const qrCode = await createConnection(
      `/payments/${id}/pixQrCode`,
      paymentData,
      "POST"
    );

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      value: data.value,
      payment_id: id,
      expirationDate: qrCode.body.expirationDate,
    };
  }
  async newCreditCardPayment(data: {
    customer: string;
    billingType: string;
    totalValue?: number;
    value?: number;
    installmentCount?: number;
    dueDate: Date;
    creditCard: {
      holderName: string;
      number: string;
      expiryMonth: string;
      expiryYear: string;
      ccv: string;
    };
    creditCardHolderInfo: {
      name: string;
      email: string;
      cpfCnpj: string;
      postalCode: string;
      addressNumber: string;
      phone: string;
    };
  }) {
    const payment = await createConnection("/payments", data, "POST");
    if (payment.status !== 200) {
      throw new AsaasError(payment.body.errors[0].description);
    }

    return {
      creditCard: payment.body.creditCard,
      paymentId: payment.body.id,
    };
  }

  async existsCreditCardPayment(data: {
    customer: string;
    billingType: string;
    totalValue?: number;
    value?: number;
    installmentCount?: number;
    dueDate: Date;
    creditCardToken: string;
  }) {
    const payment = await createConnection("/payments", data, "POST");
    if (payment.status !== 200) {
      throw new AsaasError(payment.body.errors[0].description);
    }

    return {
      paymentId: payment.body.id,
    };
  }

  async recoverPixPayment(paymentId: string) {
    const qrCode = await createConnection(
      `/payments/${paymentId}/pixQrCode`,
      {},
      "POST"
    );

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      payment_id: paymentId,
      expirationDate: qrCode.body.expirationDate,
    };
  }
}
