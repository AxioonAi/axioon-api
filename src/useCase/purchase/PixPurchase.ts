import { PlanNotFoundError } from "@/helper/errors/PlanNotFoundError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import {
	AsaasRepository
} from "@/repositories/asaasRepository";
import { UserRepository } from "@/repositories/userRepository";
import { generateRandomString } from "@/utils/randomString";
import { Status } from "@prisma/client";
import moment from "moment";
interface PixPurchaseUseCaseRequest {
	userId: string;
	planId: string;
}

interface PixPurchaseUseCaseResponse {
	payment: string
}

export class PixPurchaseUseCase {
	constructor(
		private userRepository: UserRepository,
		private signaturePlanRepository: SignaturePlanRepository,
		private userPlanRepository: UserPlanRepository,
		private asaasRepository: AsaasRepository,
	) {}

	async execute({
		userId,
		planId,
	}: PixPurchaseUseCaseRequest): Promise<PixPurchaseUseCaseResponse> {
		const [user, plan] = await Promise.all([
			this.userRepository.findById(userId),
			this.signaturePlanRepository.findById(planId),
		]);

		if (!user) throw new UserNotFoundError();
		if (!plan) throw new PlanNotFoundError();

		// const payment = await this.asaasRepository.pixPayment({
		// 	customer: user.paymentId,
		// 	value: plan.pixValue,
		// });

		const userPlan = await this.userPlanRepository.create({
			user_id: userId,
			plan_id: planId,
			paymentId: generateRandomString(8),
			status: Status.ACTIVE,
			expires_in: moment().add(1, "year").toDate(),
		});

		return { payment:"Pagamento realizado com sucesso" };
	}
}
