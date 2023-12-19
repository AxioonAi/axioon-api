import { SubUserRepository } from "@/repositories/SubUserRepository";
import { UserRepository } from "@/repositories/userRepository";
import { hash } from "bcryptjs";

interface CreateSubUserUseCaseRequest {
  data: {
    name: string;
    email: string;
    password: string;
    user_id: string;
  };
}

interface CreateSubUserUseCaseResponse {}

export class CreateSubUserUseCase {
  constructor(
    private subUserRepository: SubUserRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    data,
  }: CreateSubUserUseCaseRequest): Promise<CreateSubUserUseCaseResponse> {
    const { name, email, password, user_id } = data;

    const [userExists, subUserExists] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.subUserRepository.findByEmail(email),
    ]);

    if (!userExists) throw new Error("User not found");
    if (subUserExists) throw new Error("SubUser already exists");

    const password_hash = await hash(password, 6);

    const subUser = await this.subUserRepository.create({
      name,
      email,
      password_hash,
      user_id,
    });

    return { subUser };
  }
}
