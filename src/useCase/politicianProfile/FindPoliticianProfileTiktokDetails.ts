import { TiktokBaseDataRepository } from "@/repositories/TiktokBaseDataRepository";
import { TiktokVideoDataRepository } from "@/repositories/TiktokVideoDataRepository";
import { tiktokDataFormatter } from "@/utils/dataFormatter/tiktok";

interface FindPoliticianProfileTiktokDetailsUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileTiktokDetailsUseCaseResponse {}

export class FindPoliticianProfileTiktokDetailsUseCase {
  constructor(
    private tiktokBaseDataRepository: TiktokBaseDataRepository,
    private tiktokVideoDataRepository: TiktokVideoDataRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileTiktokDetailsUseCaseRequest): Promise<FindPoliticianProfileTiktokDetailsUseCaseResponse> {
    const [video, profile] = await Promise.all([
      this.tiktokVideoDataRepository.findDetails({
        id,
        startDate,
        endDate,
      }),
      this.tiktokBaseDataRepository.findDetails({
        id,
        startDate,
        endDate,
      }),
    ]);

    const format = tiktokDataFormatter(video, profile.fans);

    return format;
  }
}
