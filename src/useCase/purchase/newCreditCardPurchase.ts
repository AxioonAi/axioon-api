import { PlanNotFoundError } from "@/helper/errors/PlanNotFoundError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { AsaasRepository } from "@/repositories/asaasRepository";
import { UserRepository } from "@/repositories/userRepository";
import { Status } from "@prisma/client";
import moment from "moment";

interface newCreditCardPurchaseUseCaseRequest {
  userId: string;
  planId: string;
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
  installmentCount: number;
  saveCreditCard: boolean;
}

interface newCreditCardPurchaseUseCaseResponse {}

export class newCreditCardPurchaseUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: SignaturePlanRepository,
    private userPlanRepository: UserPlanRepository,
    private asaasRepository: AsaasRepository
  ) {}

  async execute({
    userId,
    planId,
    creditCard,
    creditCardHolderInfo,
    installmentCount,
    saveCreditCard,
  }: newCreditCardPurchaseUseCaseRequest): Promise<newCreditCardPurchaseUseCaseResponse> {
    const [user, plan] = await Promise.all([
      this.userRepository.findById(userId),
      this.planRepository.findById(planId),
    ]);

    if (!user) throw new UserNotFoundError();
    if (!plan) throw new PlanNotFoundError();

    const installmentPaymentData = {
      customer: user.paymentId,
      billingType: "CREDIT_CARD",
      totalValue: plan.creditValue,
      installmentCount,
      dueDate: new Date(),
      creditCard,
      creditCardHolderInfo,
    };

    const fullPaymentData = {
      customer: user.paymentId,
      billingType: "CREDIT_CARD",
      value: plan.creditValue,
      dueDate: new Date(),
      creditCard,
      creditCardHolderInfo,
    };

    const asaasPayment = await this.asaasRepository.newCreditCardPayment(
      installmentCount === 1 ? fullPaymentData : installmentPaymentData
    );

    console.log(asaasPayment);

    const userPlan = await this.userPlanRepository.create({
      user_id: userId,
      plan_id: planId,
      status: Status.ACTIVE,
      paymentId: asaasPayment.paymentId,
      expires_in: moment().add(1, "year").toDate(),
    });

    // if (saveCreditCard) {
    //   await this.userCreditCardRepository.create({
    //     ...asaasPayment.creditCard,
    //     user_id: userId,
    //   });
    // }

    return { userPlan };
  }
}
