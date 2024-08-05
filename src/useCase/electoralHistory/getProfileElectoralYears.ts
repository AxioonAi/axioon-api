import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import {
  ElectoralHistoryDetails,
  ElectoralHistoryRepository,
} from "@/repositories/electoralHistoryRepository";
import { Hashtag } from "@prisma/client";
interface getProfileElectoralYearsUseCaseRequest {
  profileId: string;
}

interface getProfileElectoralYearsUseCaseResponse {
  electoralYears: { id: string; election_year: string }[];
}

export class GetProfileElectoralYearsUseCase {
  constructor(private electoralHistoryRepository: ElectoralHistoryRepository) {}

  async execute({
    profileId,
  }: getProfileElectoralYearsUseCaseRequest): Promise<getProfileElectoralYearsUseCaseResponse> {
    const electoralYears =
      await this.electoralHistoryRepository.getProfileYears(profileId);

    return {
      electoralYears,
    };
  }
}
