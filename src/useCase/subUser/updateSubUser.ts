import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { SubUserRepository } from "@/repositories/SubUserRepository";
import { hash } from "bcryptjs";

interface updateSubUserUseCaseRequest {
	subUserId: string;
	userId: string;
	password?: string;
	active?: boolean;
}

export class updateSubUserUseCase {
	constructor(private subUserRepository: SubUserRepository) {}

	async execute({
		subUserId,
		userId,
		password,
		active,
	}: updateSubUserUseCaseRequest): Promise<void> {
		const subUser = await this.subUserRepository.findById(subUserId);

		if (!subUser) {
			throw new UserNotFoundError();
		}

		if (subUser.user_id !== userId) {
			throw new UserNotFoundError();
		}

		const password_hash = password && (await hash(password, 6));

		await this.subUserRepository.update(subUserId, { password_hash, active });

		return;
	}
}
