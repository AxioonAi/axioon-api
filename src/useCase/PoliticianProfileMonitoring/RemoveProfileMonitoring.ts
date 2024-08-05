import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";

interface RemovePoliticianProfileMonitoringUseCaseRequest {
  profileId: string;
  userId: string;
}

export class RemovePoliticianProfileMonitoringUseCase {
  constructor(
    private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository
  ) {}

  async execute({
    userId,
    profileId,
  }: RemovePoliticianProfileMonitoringUseCaseRequest): Promise<void> {
    await this.politicianProfileMonitoringRepository.remove({
      userId,
      profileId,
    });
    return;
  }
}
