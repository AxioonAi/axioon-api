import { YoutubeDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
import { DataNotFoundError } from "@/helper/errors/DataNotFound";
import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { youtubeDataFormatter } from "@/utils/dataFormatter/youtube";
import moment from "moment";

interface FindPoliticianProfileYoutubeDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileYoutubeDetailsUseCaseResponse {
	data: {
		keyIndicators: {
			name: string;
			current: number;
			previous: number;
		}[];
		commentsStatistics: {
			sentimentStatistics: {
				totalSentiment: number;
				countSentiment0To350: number;
				countSentiment351To650: number;
				countSentiment651To1000: number;
				sentimentAverage: number;
			};
		};
		wordCloud:
			| {
					text: string;
			  }[]
			| {
					word: string;
					quantity: number;
			  }[];
		posts: YoutubeDataFormatterFinalDataInterface[];
	};
}

export class FindPoliticianProfileYoutubeDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileYoutubeDetailsUseCaseRequest): Promise<FindPoliticianProfileYoutubeDetailsUseCaseResponse> {
		const [current, previous] = await Promise.all([
			this.politicianProfileRepository.findYoutubeStatistics({
				id,
				gte: moment().subtract(period, "day").toDate(),
				lte: moment().toDate(),
			}),
			this.politicianProfileRepository.findYoutubeStatistics({
				id,
				gte: moment()
					.subtract(period * 2, "day")
					.toDate(),
				lte: moment()
					.subtract(period - 1, "day")
					.toDate(),
			}),
		]);

		if (!current || !previous) throw new ProfileNotFoundError();
		if (
			current.youtubeBaseData.length === 0 &&
			previous.youtubeBaseData.length === 0
		) {
			throw new DataNotFoundError();
		}

		if (current.youtubeVideoData.length === 0) throw new DataNotFoundError();

		const formatCurrent = youtubeDataFormatter(
			current,
			previous.youtubeBaseData[0],
		);
		const formatPrevious = youtubeDataFormatter(
			previous,
			current.youtubeBaseData[0],
		);

		const comments = current.youtubeCommentData;
		const wordCount = CommentWordCount({
			youtubeCommentData: comments,
			tiktokComments: [],
			instagramPostComments: [],
			facebookPostComments: [],
		});

		const finalStatistics = {
			keyIndicators: [
				{
					name: "Likes",
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
			wordCloud: wordCount,
		};

		return { data: finalStatistics };
	}
}
