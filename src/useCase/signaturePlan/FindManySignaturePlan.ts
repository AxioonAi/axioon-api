import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";
import { SignaturePlan } from "@prisma/client";

interface FindManySignaturePlanUseCaseRequest {}

interface FindManySignaturePlanUseCaseResponse {
	plans: SignaturePlan[];
}

export class FindManySignaturePlanUseCase {
	constructor(private signaturePlanRepository: SignaturePlanRepository) {}

	async execute({}: FindManySignaturePlanUseCaseRequest): Promise<FindManySignaturePlanUseCaseResponse> {
		const plans = await this.signaturePlanRepository.findAll();

		return { plans };
	}
}
