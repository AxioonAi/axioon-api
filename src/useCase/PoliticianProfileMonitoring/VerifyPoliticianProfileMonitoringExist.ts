import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";

interface VerifyPoliticianProfileMonitoringExistUseCaseRequest {
  id: string;
  profileId: string;
}

interface VerifyPoliticianProfileMonitoringExistUseCaseResponse {}

export class VerifyPoliticianProfileMonitoringExistUseCase {
  constructor(
    private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository
  ) {}

  async execute({
    id,
    profileId,
  }: VerifyPoliticianProfileMonitoringExistUseCaseRequest): Promise<VerifyPoliticianProfileMonitoringExistUseCaseResponse> {
    const exists = await this.politicianProfileMonitoringRepository.verify({
      profileId,
      userId: id,
    });

    if (!exists) {
      throw new Error("Monitoring not found");
    }

    return {};
  }
}
