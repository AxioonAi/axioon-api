import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";
import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";
import { FacebookDataFormatter } from "@/utils/dataFormatter/facebook";

interface FindPoliticianProfileFacebookDetailsUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileFacebookDetailsUseCaseResponse {}

export class FindPoliticianProfileFacebookDetailsUseCase {
  constructor(
    private facebookBaseDataRepository: FacebookBaseDataRepository,
    private facebookPostBaseDataRepository: FacebookPostBaseDataRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileFacebookDetailsUseCaseRequest): Promise<FindPoliticianProfileFacebookDetailsUseCaseResponse> {
    const [profile, posts] = await Promise.all([
      this.facebookBaseDataRepository.findDetails({
        id,
        startDate,
        endDate,
      }),
      this.facebookPostBaseDataRepository.findDetails({
        id,
        startDate,
        endDate,
      }),
    ]);

    const format = FacebookDataFormatter(posts, profile.followers_count);

    return { format };
  }
}
