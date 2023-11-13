import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { UserRepository } from "@/repositories/userRepository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      throw new AuthenticateError();
    }

    const isPasswordValid = await compare(password, userExists.password_hash);
    if (!isPasswordValid) {
      throw new AuthenticateError();
    }

    return { user: userExists };
  }
}
