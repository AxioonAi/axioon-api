import { TiktokDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
import { DataNotFoundError } from "@/helper/errors/DataNotFound";
import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { tiktokDataFormatter } from "@/utils/dataFormatter/tiktok";
import moment from "moment";

interface FindPoliticianProfileTiktokDetailsUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileTiktokDetailsUseCaseResponse {
  data: {
    keyIndicators: {
      name: string;
      current: number;
      previous: number;
    }[];
    commentsStatistics: {
      commentTime: {
        name: string;
        value: number;
      }[];
      sentimentStatistics: {
        totalSentiment: number;
        countSentiment0To350: number;
        countSentiment351To650: number;
        countSentiment651To1000: number;
        sentimentAverage: number;
      };
    };
    posts: TiktokDataFormatterFinalDataInterface[];
  };
}

export class FindPoliticianProfileTiktokDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileTiktokDetailsUseCaseRequest): Promise<FindPoliticianProfileTiktokDetailsUseCaseResponse> {
    const [current, previous] = await Promise.all([
      this.politicianProfileRepository.findTiktokStatistics({
        id,
        gte: moment().subtract(period, "day").toDate(),
        lte: moment().toDate(),
      }),
      this.politicianProfileRepository.findTiktokStatistics({
        id,
        gte: moment()
          .subtract(period * 2, "day")
          .toDate(),
        lte: moment()
          .subtract(period - 1, "day")
          .toDate(),
      }),
    ]);

    console.log(current);

    if (!current || !previous) throw new ProfileNotFoundError();

    if (current.tiktokData.length === 0 && previous.tiktokData.length === 0) {
      throw new DataNotFoundError();
    }
    if (current.tiktokVideoData.length === 0) {
      throw new DataNotFoundError();
    }

    const formatCurrent = tiktokDataFormatter(current, previous.tiktokData[0]);
    const formatPrevious = tiktokDataFormatter(previous, current.tiktokData[0]);

    const finalStatistics = {
      keyIndicators: [
        {
          name: "Curtidas",
          current: formatCurrent.videoEngagementData.like,
          previous: formatPrevious.videoEngagementData.like,
        },
        {
          name: "Comentários",
          current: formatCurrent.videoEngagementData.comments,
          previous: formatPrevious.videoEngagementData.comments,
        },
        {
          name: "Visualizações",
          current: formatCurrent.videoEngagementData.views,
          previous: formatPrevious.videoEngagementData.views,
        },
        {
          name: "Sentimento",
          current: formatCurrent.videoEngagementData.sentiment,
          previous: formatPrevious.videoEngagementData.sentiment,
        },
      ],
      commentsStatistics: formatCurrent.commentsStatistics,
      posts: formatCurrent.videos,
    };

    return { data: finalStatistics };
  }
}
