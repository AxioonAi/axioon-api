import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { mentionsFormatter } from "@/utils/dataFormatter/mentions";
import moment from "moment";

interface FindPoliticianProfileMentionsDetailsUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileMentionsDetailsUseCaseResponse {
  currentFormat: {
    news: {
      positive: number;
      neutral: number;
      negative: number;
      total: number;
      average: number;
      news: {
        sentiment: number;
        sentimentClassification: string;
        title: string;
        url: string;
        date: Date;
      }[];
    };
    mentions: {
      positive: number;
      neutral: number;
      negative: number;
      total: number;
      average: number;
      mentions: {
        sentiment: number;
        sentimentClassification: string;
        commentSentiment: number;
        profile: string;
        date: Date;
        comments: {
          id: string;
          text: string;
          sentimentAnalysis: number;
        }[];
        title: string;
        url: string;
      }[];
    };
  };
}

export class FindPoliticianProfileMentionsDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileMentionsDetailsUseCaseRequest): Promise<FindPoliticianProfileMentionsDetailsUseCaseResponse> {
    const data = await this.politicianProfileRepository.findMentionsStatistics({
      id,
      gte: moment().subtract(period, "day").toDate(),
      lte: moment().toDate(),
    });


    if (!data) throw new ProfileNotFoundError();

    const currentFormat = mentionsFormatter(data);

    return { currentFormat };
  }
}
