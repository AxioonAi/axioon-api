// import { InstagramDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
// import { DataNotFoundError } from "@/helper/errors/DataNotFound";
// import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
// import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
// import { instagramDataFormatter } from "@/utils/dataFormatter/instagram";
// import moment from "moment";

// interface FindPoliticianProfileInstagramDetailsUseCaseRequest {
// 	id: string;
// 	period: number;
// }

// interface FindPoliticianProfileInstagramDetailsUseCaseResponse {
// 	data: {
// 		keyIndicators: {
// 			name: string;
// 			current: number;
// 			previous: number;
// 		}[];
// 		commentsStatistics: {
// 			commentTime: {
// 				name: string;
// 				value: number;
// 			}[];
// 			sentimentStatistics: {
// 				totalSentiment: number;
// 				countSentiment0To350: number;
// 				countSentiment351To650: number;
// 				countSentiment651To1000: number;
// 				sentimentAverage: number;
// 			};
// 		};
// 		posts: InstagramDataFormatterFinalDataInterface[];
// 	};
// }

// export class FindPoliticianProfileInstagramDetailsUseCase {
// 	constructor(
// 		private politicianProfileRepository: PoliticianProfileRepository,
// 	) {}

// 	async execute({
// 		id,
// 		period,
// 	}: FindPoliticianProfileInstagramDetailsUseCaseRequest): Promise<FindPoliticianProfileInstagramDetailsUseCaseResponse> {
// 		const [current, previous] = await Promise.all([
// 			this.politicianProfileRepository.findInstagramStatistics({
// 				id,
// 				gte: moment().subtract(period, "day").toDate(),
// 				lte: moment().toDate(),
// 			}),
// 			this.politicianProfileRepository.findInstagramStatistics({
// 				id,
// 				gte: moment()
// 					.subtract(period * 2, "day")
// 					.toDate(),
// 				lte: moment()
// 					.subtract(period - 1, "day")
// 					.toDate(),
// 			}),
// 		]);

// 		if (!current || !previous) throw new ProfileNotFoundError();

// 		if (
// 			current.instagramData.length === 0 &&
// 			previous.instagramData.length === 0
// 		) {
// 			throw new DataNotFoundError();
// 		}

// 		const formatCurrent = instagramDataFormatter(
// 			current,
// 			previous.instagramData[0],
// 		);
// 		const formatPrevious = instagramDataFormatter(
// 			previous,
// 			current.instagramData[0],
// 		);
// 		const finalStatistics = {
// 			keyIndicators: [
// 				{
// 					name: "Comentários",
// 					current: formatCurrent.postEngagementData.comments,
// 					previous: formatPrevious.postEngagementData.comments,
// 				},
// 				{
// 					name: "Curtidas",
// 					current: formatCurrent.postEngagementData.like,
// 					previous: formatPrevious.postEngagementData.like,
// 				},
// 				{
// 					name: "Sentimento",
// 					current: formatCurrent.postEngagementData.sentiment,
// 					previous: formatPrevious.postEngagementData.sentiment,
// 				},
// 			],
// 			commentsStatistics: formatCurrent.commentStatistics,
// 			posts: formatCurrent.posts,
// 		};

// 		return { data: finalStatistics };
// 	}
// }
