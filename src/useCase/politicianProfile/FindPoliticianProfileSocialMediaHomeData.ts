import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { EngagementDataFormatter } from "@/utils/dataFormatter/engagement";

interface FindPoliticianProfileSocialMediaHomeDataUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileSocialMediaHomeDataUseCaseResponse {}

export class FindPoliticianProfileSocialMediaHomeDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileSocialMediaHomeDataUseCaseRequest): Promise<FindPoliticianProfileSocialMediaHomeDataUseCaseResponse> {
		const [followers, comments, posts] = await Promise.all([
			this.politicianProfileRepository.findFollowersStatistics({ id, period }),
			this.politicianProfileRepository.findCommentsStatistics({ id, period }),
			this.politicianProfileRepository.findPostsStatistics({ id, period }),
		]);

		const wordCount = !comments ? null : CommentWordCount(comments);
		const engagement = !posts ? null : EngagementDataFormatter(posts);

		if (!followers.current || !followers.previous) {
			throw new Error("Data not found");
		}

		const followersData = {
			current: {
				instagram: followers.current.instagramData[0]
					? followers.current.instagramData[0].followers
					: 0,
				tiktok: followers.current.tiktokData[0]
					? followers.current.tiktokData[0].fans
					: 0,
				facebook: followers.current.facebookData[0]
					? followers.current.facebookData[0].followers_count
					: 0,
				youtube: followers.current.youtubeBaseData[0]
					? followers.current.youtubeBaseData[0].channel_total_subs
					: 0,
			},
			previous: {
				instagram: followers.previous.instagramData[0]
					? followers.previous.instagramData[0].followers
					: 0,
				tiktok: followers.previous.tiktokData[0]
					? followers.previous.tiktokData[0].fans
					: 0,
				facebook: followers.previous.facebookData[0]
					? followers.previous.facebookData[0].followers_count
					: 0,
				youtube: followers.previous.youtubeBaseData[0]
					? followers.previous.youtubeBaseData[0].channel_total_subs
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
		};

		return data;
	}
}
