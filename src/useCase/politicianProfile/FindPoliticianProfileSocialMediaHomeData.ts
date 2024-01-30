import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { EngagementDataFormatter } from "@/utils/dataFormatter/engagement";
import moment from "moment";

interface FindPoliticianProfileSocialMediaHomeDataUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileSocialMediaHomeDataUseCaseResponse {
	data: {
		followers: {
			currentTotal: number;
			previousTotal: number;
			current: {
				instagram: number;
				tiktok: number;
				facebook: number;
				youtube: number;
			};
			previous: {
				instagram: number;
				tiktok: number;
				facebook: number;
				youtube: number;
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
		engagement: {
			facebook: number;

			instagram: number;
			tiktok: number;
			youtube: number;
		};
		staticData: {
			facebook: {
				like: number;
				followers: number;
			} | null;
			tiktok: {
				likes: number;
				followers: number;
			} | null;
			youtube: {
				subs: number;
				views: number;
			} | null;
			instagram: {
				followers: number;
				posts: number;
			} | null;
		};
	};
}

export class FindPoliticianProfileSocialMediaHomeDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileSocialMediaHomeDataUseCaseRequest): Promise<FindPoliticianProfileSocialMediaHomeDataUseCaseResponse> {
		const [currentFollowers, previousFollowers, comments, posts] =
			await Promise.all([
				this.politicianProfileRepository.findFollowersStatistics({
					id,
					gte: moment().subtract(period, "day").toDate(),
					lte: moment().toDate(),
				}),
				this.politicianProfileRepository.findFollowersStatistics({
					id,
					gte: moment()
						.subtract(period * 2, "day")
						.toDate(),
					lte: moment()
						.subtract(period - 1, "day")
						.toDate(),
				}),
				this.politicianProfileRepository.findCommentsStatistics({
					id,
					gte: moment().subtract(period, "day").toDate(),
					lte: moment().toDate(),
				}),
				this.politicianProfileRepository.findPostsStatistics({
					id,
					gte: moment().subtract(period, "day").toDate(),
					lte: moment().toDate(),
				}),
			]);

		if (!comments || !posts || !currentFollowers || !previousFollowers)
			throw new ProfileNotFoundError();

		const wordCount = CommentWordCount(comments);
		const engagement = EngagementDataFormatter(posts);

		const followersData = {
			current: {
				instagram: currentFollowers.instagramData[0]
					? currentFollowers.instagramData[0].followers
					: 0,
				tiktok: currentFollowers.tiktokData[0]
					? currentFollowers.tiktokData[0].fans
					: 0,
				facebook: currentFollowers.facebookData[0]
					? currentFollowers.facebookData[0].followers_count
					: 0,
				youtube: currentFollowers.youtubeBaseData[0]
					? currentFollowers.youtubeBaseData[0].channel_total_subs
					: 0,
			},
			previous: {
				instagram: previousFollowers.instagramData[0]
					? previousFollowers.instagramData[0].followers
					: 0,
				tiktok: previousFollowers.tiktokData[0]
					? previousFollowers.tiktokData[0].fans
					: 0,
				facebook: previousFollowers.facebookData[0]
					? previousFollowers.facebookData[0].followers_count
					: 0,
				youtube: previousFollowers.youtubeBaseData[0]
					? previousFollowers.youtubeBaseData[0].channel_total_subs
					: 0,
			},
		};

		const data = {
			followers: {
				...followersData,
				currentTotal:
					followersData.current.instagram +
					followersData.current.tiktok +
					followersData.current.facebook +
					followersData.current.youtube,
				previousTotal:
					followersData.previous.instagram +
					followersData.previous.tiktok +
					followersData.previous.facebook +
					followersData.previous.youtube,
			},
			wordCloud: wordCount,
			engagement,
			staticData: {
				facebook: currentFollowers.facebookData[0]
					? {
							like: currentFollowers.facebookData[0].likes_count,
							followers: currentFollowers.facebookData[0].followers_count,
					  }
					: null,
				tiktok: currentFollowers.tiktokData[0]
					? {
							likes: currentFollowers.tiktokData[0].heart,
							followers: currentFollowers.tiktokData[0].fans,
					  }
					: null,
				youtube: currentFollowers.youtubeBaseData[0]
					? {
							subs: currentFollowers.youtubeBaseData[0].channel_total_subs,
							views: currentFollowers.youtubeBaseData[0].channel_total_views,
					  }
					: null,
				instagram: currentFollowers.instagramData[0]
					? {
							followers: currentFollowers.instagramData[0].followers,
							posts:
								currentFollowers.instagramData[0].posts_count +
								currentFollowers.instagramData[0].reels_count,
					  }
					: null,
			},
		};

		console.log(data.engagement);

		return { data };
	}
}
