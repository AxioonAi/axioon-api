import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { TiktokVideoDataRepository } from "@/repositories/TiktokVideoDataRepository";
import { YoutubeVideoDataRepository } from "@/repositories/YoutubeVideoDataRepository";

interface FindPoliticianProfileSocialMediaHomeDataUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileSocialMediaHomeDataUseCaseResponse {}

export class FindPoliticianProfileSocialMediaHomeDataUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private youtubeVideoDataRepository: YoutubeVideoDataRepository,
    private tiktokVideoDataRepository: TiktokVideoDataRepository,
    private facebookPostBaseDataRepository: FacebookPostBaseDataRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileSocialMediaHomeDataUseCaseRequest): Promise<FindPoliticianProfileSocialMediaHomeDataUseCaseResponse> {
    const [youtube, tiktok, facebook] = await Promise.all([
      this.youtubeVideoDataRepository.findHomeData({
        id,
        startDate,
        endDate,
      }),
      this.tiktokVideoDataRepository.findHomeData({
        id,
        startDate,
        endDate,
      }),
      this.facebookPostBaseDataRepository.findHomeData({
        id,
        startDate,
        endDate,
      }),
    ]);

    const formattedData = {
      youtube: {
        current: {
          ...youtube[0]._sum,
          interactions:
            youtube[0]._sum.viewCount +
            youtube[0]._sum.commentsCount * 1 +
            youtube[0]._sum.likes * 1,
        },
        previous: {
          ...youtube[1]._sum,
          interactions:
            youtube[1]._sum.viewCount +
            youtube[1]._sum.commentsCount * 1 +
            youtube[1]._sum.likes * 1,
        },
      },
      tiktok: {
        current: {
          ...tiktok[0]._sum,
          interactions:
            tiktok[0]._sum.diggCount * 1 +
            tiktok[0]._sum.commentCount * 1 +
            tiktok[0]._sum.playCount * 1 +
            tiktok[0]._sum.shareCount * 1,
        },
        previous: {
          ...tiktok[1]._sum,
          interactions:
            tiktok[1]._sum.diggCount * 1 +
            tiktok[1]._sum.commentCount * 1 +
            tiktok[1]._sum.playCount * 1 +
            tiktok[1]._sum.shareCount * 1,
        },
      },
      facebook: {
        current: {
          ...facebook[0]._sum,
          interactions:
            facebook[0]._sum.like * 1 +
            facebook[0]._sum.comments * 1 +
            facebook[0]._sum.shares * 1,
        },
        previous: {
          ...facebook[1]._sum,
          interactions:
            facebook[1]._sum.like * 1 +
            facebook[1]._sum.comments * 1 +
            facebook[1]._sum.shares * 1,
        },
      },
    };

    return formattedData;
  }
}
