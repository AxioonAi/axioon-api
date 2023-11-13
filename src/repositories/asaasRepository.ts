interface CreateUserResponse {
  id: string;
}

export interface AsaasUserInterface {
  name: string;
  cpfCnpj: string;
  mobilePhone: string;
}

export interface AsaasPaymentResponseInterface {
  encodedImage: string;
  payload: string;
  expirationDate: Date;
  value?: number;
  payment_id: string;
}

export interface AsaasRepository {
  createUser(user: AsaasUserInterface): Promise<CreateUserResponse>;
  recoverPayment(paymentId: string): Promise<AsaasPaymentResponseInterface>;
  pixPayment(data: {
    customer: string;
    value: number;
  }): Promise<AsaasPaymentResponseInterface>;
  newCreditCardPayment(data: {
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
    customer: string;
    billingType: string;
    totalValue?: number;
    value?: number;
    installmentCount?: number;
    dueDate: Date;
  }): Promise<any>;
  existsCreditCardPayment(data: {
    customer: string;
    billingType: string;
    totalValue?: number;
    value?: number;
    installmentCount?: number;
    dueDate: Date;
    creditCardToken: string;
  }): Promise<any>;
  recoverPixPayment(paymentId: string): Promise<AsaasPaymentResponseInterface>;
}
