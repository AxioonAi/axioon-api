import { UserRecoverPasswordCodeRepository } from "@/repositories/UserRecoverPasswordCodeRepository";
import { UserRepository } from "@/repositories/userRepository";
import { hash } from "bcryptjs";

interface UserRecoverPasswordUseCaseRequest {
	data: {
		code: string;
		password: string;
	};
}

export class UserRecoverPasswordUseCase {
	constructor(
		private userRepository: UserRepository,
		private userRecoverPasswordCodeRepository: UserRecoverPasswordCodeRepository,
	) {}

	async execute({ data }: UserRecoverPasswordUseCaseRequest): Promise<void> {
		const { code, password } = data;

		const userRecoverPasswordCode =
			await this.userRecoverPasswordCodeRepository.findByCode(code);

		if (!userRecoverPasswordCode) throw new Error("invalid code or expired");

		const password_hash = await hash(password, 6);

		await this.userRepository.update(userRecoverPasswordCode.user_id, {
			password_hash,
		});

		return;
	}
}
