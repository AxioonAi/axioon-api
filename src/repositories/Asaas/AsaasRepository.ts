import { AsaasError } from "@/helper/errors/AsaasError";
import { createConnection } from "@/utils/asaas";
import {
  AsaasPaymentInterface,
  AsaasRepository,
  AsaasUserInterface,
} from "../asaasRepository";

export class AsaasProductionRepository implements AsaasRepository {
  async pixTransfer(
    access_token: string,
    data: { pixAddressKey: string; value: number; pixAddressKeyType: string }
  ) {
    const transfer = await createConnection({
      endpoint: "/transfers",
      body: data,
      method: "POST",
      key: access_token,
    });
    if (transfer.status !== 200) {
      throw new AsaasError(transfer.body.errors[0].description);
    }

    return transfer;
  }
  async createClient(data: {
    name: string;
    email: string;
    cpfCnpj: string;
    companyType: string;
    mobilePhone: string;
    address: string;
    addressNumber: string;
    province: string;
    postalCode: string;
  }) {
    const create = await createConnection({
      endpoint: "/accounts",
      body: data,
      method: "POST",
    });
    if (create.status !== 200) {
      throw new AsaasError(create.body.errors[0].description);
    }

    return { walletId: create.body.walletId, access_token: create.body.apiKey };

    // return { walletId: "123", access_token: "123" };
  }
  async createUser(user: AsaasUserInterface) {
    const createData = {
      ...user,
      notificationDisabled: true,
    };
    const createUser = await createConnection({
      endpoint: "/customers",
      body: createData,
      method: "POST",
    });

    if (createUser.status !== 200) {
      throw new AsaasError(createUser.body.errors[0].description);
    }

    return { id: createUser.body.id };
  }

  async getBalance(access_token: string) {
    const balance = await createConnection({
      endpoint: "/finance/balance",
      key: access_token,
      method: "GET",
    });
    if (balance.status !== 200) {
      throw new AsaasError(balance.body.errors[0].description);
    }
    return balance.body.balance;
  }

  async getTransfers(access_token: string) {
    const transfers = await createConnection({
      endpoint: "/transfers",
      key: access_token,
      method: "GET",
    });

    if (transfers.status !== 200) {
      throw new AsaasError(transfers.body.errors[0].description);
    }

    return transfers.body.data;
  }

  async buy({ customer, dueDate, value }: AsaasPaymentInterface) {
    const createData = {
      customer,
      dueDate,
      value: value,
      billingType: "PIX",
    };
    const createPayment = await createConnection({
      endpoint: "/payments",
      body: createData,
      method: "POST",
    });
    if (createPayment.status !== 200) {
      throw new AsaasError("");
    }

    const id = createPayment.body.id;
    const qrCode = await createConnection({
      endpoint: `/payments/${id}/pixQrCode`,
      body: createData,
      method: "POST",
    });

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      value: value,
      payment_id: id,
      expirationDate: qrCode.body.expirationDate,
    };
  }

  async recoverPayment(paymentId: string) {
    const [payment, qrCode] = await Promise.all([
      createConnection({
        endpoint: `/payments/${paymentId}`,
        method: "GET",
      }),

      createConnection({
        endpoint: `/payments/${paymentId}/pixQrCode`,
        method: "POST",
      }),
    ]);

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      value: payment.body.value,
      payment_id: paymentId,
      expirationDate: qrCode.body.expirationDate,
    };
  }

  async deletePayment(paymentId: string) {
    const deletePayment = await createConnection({
      endpoint: `/payments/${paymentId}`,
      method: "DELETE",
    });

    if (deletePayment.status !== 200) {
      throw new AsaasError("");
    }

    return deletePayment.body;
  }

  async pixPayment(data: {
    customer: string;
    value: number;
    split: {
      walletId: string;
      fixedValue: number;
    }[];
  }) {
    const paymentData = {
      billingType: "PIX",
      customer: data.customer,
      value: data.value,
      dueDate: new Date(),
      split: data.split,
    };

    const createPayment = await createConnection({
      endpoint: "/payments",
      body: paymentData,
      method: "POST",
    });
    if (createPayment.status !== 200) {
      throw new AsaasError("erro aqui");
    }

    const id = createPayment.body.id;
    const qrCode = await createConnection({
      endpoint: `/payments/${id}/pixQrCode`,
      body: paymentData,
      method: "POST",
    });

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
    const payment = await createConnection({
      endpoint: "/payments",
      body: data,
      method: "POST",
    });
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
    const payment = await createConnection({
      endpoint: "/payments",
      body: data,
      method: "POST",
    });
    if (payment.status !== 200) {
      throw new AsaasError(payment.body.errors[0].description);
    }

    return {
      paymentId: payment.body.id,
    };
  }

  async recoverPixPayment(paymentId: string) {
    const qrCode = await createConnection({
      endpoint: `/payments/${paymentId}/pixQrCode`,
      method: "POST",
    });

    return {
      encodedImage: qrCode.body.encodedImage,
      payload: qrCode.body.payload,
      payment_id: paymentId,
      expirationDate: qrCode.body.expirationDate,
    };
  }
}
