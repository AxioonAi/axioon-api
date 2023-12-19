import { SubUserRepository } from "@/repositories/SubUserRepository";
import { compare } from "bcryptjs";

interface AuthenticateSubUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateSubUserUseCaseResponse {}

export class AuthenticateSubUserUseCase {
  constructor(private subUserRepository: SubUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateSubUserUseCaseRequest): Promise<AuthenticateSubUserUseCaseResponse> {
    const subUser = await this.subUserRepository.findByEmail(email);

    if (!subUser) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(password, subUser.password_hash);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return subUser;
  }
}
