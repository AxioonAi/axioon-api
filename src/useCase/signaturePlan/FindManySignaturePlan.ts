import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";
import { SignaturePlan } from "@prisma/client";

interface FindManySignaturePlanUseCaseResponse {
	plans: SignaturePlan[];
}

export class FindManySignaturePlanUseCase {
	constructor(private signaturePlanRepository: SignaturePlanRepository) {}

	async execute(): Promise<FindManySignaturePlanUseCaseResponse> {
		const plans = await this.signaturePlanRepository.findAll();

		return { plans };
	}
}
