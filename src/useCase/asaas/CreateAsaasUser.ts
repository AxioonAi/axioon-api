import { CpfAlreadyExistsError } from "@/helper/errors/CpfAlreadyExists";
import { EmailAlreadyExistsError } from "@/helper/errors/EmailAlreadyExists";
import { AsaasRepository } from "@/repositories/asaasRepository";
import { UserRepository } from "@/repositories/userRepository";

interface CreateAsaasUserUseCaseRequest {
	name: string;
	cpfCnpj: string;
	mobilePhone: string;
	email?: string;
}

interface CreateAsaasUserUseCaseResponse {
	id: string;
}

export class CreateAsaasUserUseCase {
	constructor(
		private asaasRepository: AsaasRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		name,
		cpfCnpj,
		mobilePhone,
		email,
	}: CreateAsaasUserUseCaseRequest): Promise<CreateAsaasUserUseCaseResponse> {
		const [userAlreadyExistsWithEmail, userAlreadyExistsWithCpfCnpj] =
			await Promise.all([
				email ? this.userRepository.findByEmail(email) : null,
				this.userRepository.findByCpfCnpj(cpfCnpj),
			]);

		if (userAlreadyExistsWithEmail) throw new EmailAlreadyExistsError();
		if (userAlreadyExistsWithCpfCnpj) throw new CpfAlreadyExistsError();

		const { id } = await this.asaasRepository.createUser({
			name,
			cpfCnpj,
			mobilePhone,
		});

		return { id };
	}
}
