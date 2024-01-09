import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { UserRepository } from "@/repositories/userRepository";
import { compare, hash } from "bcryptjs";

interface UpdateUserPasswordUseCaseRequest {
	id: string;
	data: {
		password: string;
		newPassword: string;
	};
}

export class UpdateUserPasswordUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id, data }: UpdateUserPasswordUseCaseRequest): Promise<void> {
		const { password, newPassword } = data;
		const user = await this.userRepository.findById(id);

		if (!user) throw new UserNotFoundError();

		const isPasswordValid = await compare(password, user.password_hash);

		if (!isPasswordValid) throw new AuthenticateError();

		const password_hash = await hash(newPassword, 6);
		await this.userRepository.update(id, {
			password_hash,
		});
	}
}
