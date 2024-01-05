import { UserRepository } from "@/repositories/userRepository";
import { SexType } from "@prisma/client";
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
		sex?: string;
	};
}

export class UpdateUserAccountUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id, data }: UpdateUserAccountUseCaseRequest): Promise<void> {
		const { password, sex, ...rest } = data;
		const formattedSex = data.sex === "MALE" ? SexType.MALE : SexType.FEMALE;
		const user = await this.userRepository.update(id, {
			...data,
			sex: formattedSex,
			password_hash: data.password ? await hash(data.password, 6) : undefined,
		});

		return;
	}
}
