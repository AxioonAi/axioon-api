import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { UserRepository } from "@/repositories/userRepository";
import { User } from "@prisma/client";

interface UserProfileUseCaseRequest {
	id: string;
}

interface UserProfileUseCaseResponse {
	user: User;
}

export class UserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		id,
	}: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(id);

		if (!user) throw new UserNotFoundError();

		return { user };
	}
}
