import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { SubUserRepository } from "@/repositories/SubUserRepository";
import { SubUser } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateSubUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateSubUserUseCaseResponse {
  user: SubUser;
}

export class AuthenticateSubUserUseCase {
  constructor(private subUserRepository: SubUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateSubUserUseCaseRequest): Promise<AuthenticateSubUserUseCaseResponse> {
    const subUser = await this.subUserRepository.findByEmail(email);

    if (!subUser) {
      throw new AuthenticateError();
    }

    const passwordMatch = await compare(password, subUser.password_hash);

    if (!passwordMatch) {
      throw new AuthenticateError();
    }

    return { user: subUser };
  }
}
