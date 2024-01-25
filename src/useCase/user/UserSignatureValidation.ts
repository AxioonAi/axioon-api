import { SignatureNotFoundError } from "@/helper/errors/SignatureNotFoundError";
import { UnauthorizedError } from "@/helper/errors/UnauthorizedError";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";

interface UserSignatureValidationUseCaseRequest {
	id: string;
	type: string;
}

export class UserSignatureValidationUseCase {
	constructor(private userPlanRepository: UserPlanRepository) {}

	async execute({
		id,
		type,
	}: UserSignatureValidationUseCaseRequest): Promise<void> {
		const signature = await this.userPlanRepository.findActivePlan(id);
		if (!signature) {
			throw new UnauthorizedError();
		}

		switch (type) {
			case "ai":
				if (!signature.plan.ai_access) throw new SignatureNotFoundError();
				break;
			case "electoral":
				if (!signature.plan.electoral_history)
					throw new SignatureNotFoundError();
				break;
			case "legal":
				if (!signature.plan.legal_data) throw new SignatureNotFoundError();
				break;
			case "ads":
				if (!signature.plan.facebook_ads_monitoring)
					throw new SignatureNotFoundError();
				break;
		}

		return;
	}
}
