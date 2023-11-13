interface CreateUserResponse {
  id: string;
}

export interface AsaasUserInterface {
  name: string;
  cpfCnpj: string;
  mobilePhone: string;
}

export interface AsaasPaymentInterface {
  value: number;
  dueDate: Date;
  customer: string;
}

export interface AsaasPaymentResponseInterface {
  encodedImage: string;
  payload: string;
  expirationDate: Date;
  value?: number;
  payment_id: string;
}

export interface CreateClientInterface {
  walletId: string;
  access_token: string;
}

export interface AsaasRepository {
  createClient(data: {
    name: string;
    email: string;
    cpfCnpj: string;
    companyType: string;
    mobilePhone: string;
    address: string;
    addressNumber: string;
    province: string;
    postalCode: string;
  }): Promise<CreateClientInterface>;
  getBalance(access_token: string): Promise<number>;
  getTransfers(access_token: string): Promise<any>;
  createUser(user: AsaasUserInterface): Promise<CreateUserResponse>;
  recoverPayment(paymentId: string): Promise<AsaasPaymentResponseInterface>;
  deletePayment(paymentId: string): Promise<void>;
  pixTransfer(
    access_token: String,
    data: { pixAddressKey: string; value: number; pixAddressKeyType: string }
  ): Promise<any>;
  pixPayment(data: {
    customer: string;
    value: number;
    split: {
      walletId: string;
      fixedValue: number;
    }[];
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
