import { PlanNotFoundError } from "@/helper/errors/PlanNotFoundError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { AsaasRepository } from "@/repositories/asaasRepository";
import { UserRepository } from "@/repositories/userRepository";
import { Status } from "@prisma/client";
import moment from "moment";
interface PixPurchaseUseCaseRequest {
	userId: string;
	planId: string;
}

export class PixPurchaseUseCase {
	constructor(
		private userRepository: UserRepository,
		private signaturePlanRepository: SignaturePlanRepository,
		private userPlanRepository: UserPlanRepository,
		private asaasRepository: AsaasRepository,
	) {}

	async execute({ userId, planId }: PixPurchaseUseCaseRequest): Promise<void> {
		const [user, plan] = await Promise.all([
			this.userRepository.findById(userId),
			this.signaturePlanRepository.findById(planId),
		]);

		if (!user) throw new UserNotFoundError();
		if (!plan) throw new PlanNotFoundError();

		const payment = await this.asaasRepository.pixPayment({
			customer: user.paymentId,
			value: plan.pixValue,
		});

		const userPlan = await this.userPlanRepository.create({
			user_id: userId,
			plan_id: planId,
			paymentId: payment.payment_id,
			status: Status.INACTIVE,
			expires_in: moment().add(1, "year").toDate(),
		});

		return;
	}
}
