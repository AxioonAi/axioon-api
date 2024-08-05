import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import {
  ElectoralHistoryDetails,
  ElectoralHistoryRepository,
} from "@/repositories/electoralHistoryRepository";
import { Hashtag } from "@prisma/client";
interface getElectoralHistoryUseCaseRequest {
  id: string;
}

interface getElectoralHistoryUseCaseResponse {
  electoralHistory: ElectoralHistoryDetails | null;
}

export class GetElectoralHistoryUseCase {
  constructor(private electoralHistoryRepository: ElectoralHistoryRepository) {}

  async execute({
    id,
  }: getElectoralHistoryUseCaseRequest): Promise<getElectoralHistoryUseCaseResponse> {
    const electoralHistory =
      await this.electoralHistoryRepository.getDetailsById(id);

    return {
      electoralHistory,
    };
  }
}
