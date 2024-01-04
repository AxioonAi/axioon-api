import { SubUserRepository } from "@/repositories/SubUserRepository";
import { SubUser } from "@prisma/client";

interface SubUserListUseCaseRequest {
	userId: string;
}

interface SubUserListUseCaseResponse {
	subUsers: SubUser[];
}

export class SubUserListUseCase {
	constructor(private subUserRepository: SubUserRepository) {}

	async execute({
		userId,
	}: SubUserListUseCaseRequest): Promise<SubUserListUseCaseResponse> {
		const subUsers = await this.subUserRepository.findByUserId(userId);

		return { subUsers };
	}
}
