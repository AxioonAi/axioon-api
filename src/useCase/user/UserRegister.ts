import { EmailAlreadyExistsError } from "@/helper/errors/EmailAlreadyExists";
import { UserRepository } from "@/repositories/userRepository";
import { SexType, User } from "@prisma/client";
import { hash } from "bcryptjs";

interface UserRegisterUseCaseRequest {
	data: {
		name: string;
		email: string;
		password: string;
		social_name: string;
		sex: string;
		birth_date: Date;
		cpfCnpj: string;
		paymentId: string;
		mobilePhone: string;
	};
}

interface UserRegisterUseCaseResponse {
	user: User;
}

export class UserRegisterUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		data,
	}: UserRegisterUseCaseRequest): Promise<UserRegisterUseCaseResponse> {
		const { password, sex, ...rest } = data;

		const userExists = await this.userRepository.findByEmail(data.email);

		if (userExists) throw new EmailAlreadyExistsError();

		const password_hash = await hash(password, 6);
		const formattedSex = sex === "MALE" ? SexType.MALE : SexType.FEMALE;

		const user = await this.userRepository.create({
			...rest,
			password_hash,
			sex: formattedSex,
		});

		return { user };
	}
}
