// import { FacebookDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
// import { DataNotFoundError } from "@/helper/errors/DataNotFound";
// import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
// import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";
// import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";
// import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
// import { FacebookDataFormatter } from "@/utils/dataFormatter/facebook";
// import moment from "moment";

// interface FindPoliticianProfileFacebookDetailsUseCaseRequest {
// 	id: string;
// 	period: number;
// }

// interface FindPoliticianProfileFacebookDetailsUseCaseResponse {
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
// 		posts: FacebookDataFormatterFinalDataInterface[];
// 	};
// }

// export class FindPoliticianProfileFacebookDetailsUseCase {
// 	constructor(
// 		private politicianProfileRepository: PoliticianProfileRepository,
// 	) {}

// 	async execute({
// 		id,
// 		period,
// 	}: FindPoliticianProfileFacebookDetailsUseCaseRequest): Promise<FindPoliticianProfileFacebookDetailsUseCaseResponse> {
// 		const [current, previous] = await Promise.all([
// 			this.politicianProfileRepository.findFacebookStatistics({
// 				id,
// 				gte: moment().subtract(period, "day").toDate(),
// 				lte: moment().toDate(),
// 			}),
// 			this.politicianProfileRepository.findFacebookStatistics({
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
// 			current.facebookData.length === 0 &&
// 			previous.facebookData.length === 0
// 		) {
// 			throw new DataNotFoundError();
// 		}

// 		const formatCurrent = FacebookDataFormatter(
// 			current,
// 			previous.facebookData[0],
// 		);
// 		const formatPrevious = FacebookDataFormatter(
// 			previous,
// 			current.facebookData[0],
// 		);
// 		const finalStatistics = {
// 			keyIndicators: [
// 				{
// 					name: "Compartilhamentos",
// 					current: formatCurrent.postEngagementData.shares,
// 					previous: formatPrevious.postEngagementData.shares,
// 				},
// 				{
// 					name: "Curtidas",
// 					current: formatCurrent.postEngagementData.like,
// 					previous: formatPrevious.postEngagementData.like,
// 				},
// 				{
// 					name: "Comentários",
// 					current: formatCurrent.postEngagementData.comments,
// 					previous: formatPrevious.postEngagementData.comments,
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
