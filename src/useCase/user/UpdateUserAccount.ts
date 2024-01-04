import { UserRepository } from "@/repositories/userRepository";
import { hash } from "bcryptjs";

interface UpdateUserAccountUseCaseRequest {
	id: string;
	data: {
		name?: string;
		email?: string;
		mobilePhone?: string;
		cpfCnpj?: string;
		birthDate?: string;
		password?: string;
	};
}

interface UpdateUserAccountUseCaseResponse {}

export class UpdateUserAccountUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		id,
		data,
	}: UpdateUserAccountUseCaseRequest): Promise<UpdateUserAccountUseCaseResponse> {
		const user = await this.userRepository.update(id, {
			...data,
			password_hash: data.password ? await hash(data.password, 6) : undefined,
		});

		return {};
	}
}
