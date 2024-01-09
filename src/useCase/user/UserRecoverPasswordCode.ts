import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { UserRecoverPasswordCodeRepository } from "@/repositories/UserRecoverPasswordCodeRepository";
import { UserRepository } from "@/repositories/userRepository";
import { generateRandomString } from "@/utils/randomString";
import { sendMail } from "@/utils/sendEmail";

interface UserRecoverPasswordCodeUseCaseRequest {
	email: string;
}

interface UserRecoverPasswordCodeUseCaseResponse {
	code: string;
}

export class UserRecoverPasswordCodeUseCase {
	constructor(
		private userRepository: UserRepository,
		private userRecoverPasswordCodeRepository: UserRecoverPasswordCodeRepository,
	) {}

	async execute({
		email,
	}: UserRecoverPasswordCodeUseCaseRequest): Promise<UserRecoverPasswordCodeUseCaseResponse> {
		const userExists = await this.userRepository.findByEmail(email);

		if (!userExists) throw new UserNotFoundError();

		const code = generateRandomString(6);

		await this.userRecoverPasswordCodeRepository.create({
			user_id: userExists.id,
			code,
		});

		const mail = sendMail(userExists.email, code);

		return { code };
	}
}
