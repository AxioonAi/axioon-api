import { SubUserRepository } from "@/repositories/SubUserRepository";
import { hash } from "bcryptjs";

interface updateSubUserUseCaseRequest {
  subUserId: string;
  userId: string;
  password?: string;
  active?: boolean;
}

interface updateSubUserUseCaseResponse {}

export class updateSubUserUseCase {
  constructor(private subUserRepository: SubUserRepository) {}

  async execute({
    subUserId,
    userId,
    password,
    active,
  }: updateSubUserUseCaseRequest): Promise<updateSubUserUseCaseResponse> {
    const subUser = await this.subUserRepository.findById(subUserId);

    if (!subUser) {
      throw new Error("SubUser not found");
    }

    if (subUser.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    const password_hash = password && (await hash(password, 6));

    await this.subUserRepository.update(subUserId, { password_hash, active });

    return {};
  }
}
