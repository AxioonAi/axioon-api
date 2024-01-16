import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { youtubeDataFormatter } from "@/utils/dataFormatter/youtube";

interface FindPoliticianProfileYoutubeDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileYoutubeDetailsUseCaseResponse {}

export class FindPoliticianProfileYoutubeDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileYoutubeDetailsUseCaseRequest): Promise<FindPoliticianProfileYoutubeDetailsUseCaseResponse> {
		const { current, previous } =
			await this.politicianProfileRepository.findYoutubeStatistics({
				id,
				period,
			});

		// console.log("current: ", current?.youtubeVideoData);
		// console.log("previous: ", previous?.youtubeVideoData);

		const formatCurrent = !current ? null : youtubeDataFormatter(current);
		const formatPrevious = !previous ? null : youtubeDataFormatter(previous);

		const comments = current?.youtubeCommentData;
		const wordCount = !comments
			? null
			: CommentWordCount({
					youtubeCommentData: comments,
					tiktokComments: [],
					instagramPostComments: [],
					facebookPostComments: [],
			  });

		const finalStatistics = {
			keyIndicators: [
				{
					name: "Likes",
					current: !formatCurrent
						? null
						: formatCurrent.videoEngagementData.like,
					previous: !formatPrevious
						? null
						: formatPrevious.videoEngagementData.like,
				},
				{
					name: "Comentários",
					current: !formatCurrent
						? null
						: formatCurrent.videoEngagementData.comments,
					previous: !formatPrevious
						? null
						: formatPrevious.videoEngagementData.comments,
				},
				{
					name: "Visualizações",
					current: !formatCurrent
						? null
						: formatCurrent.videoEngagementData.views,
					previous: !formatPrevious
						? null
						: formatPrevious.videoEngagementData.views,
				},
				{
					name: "Sentimento",
					current: !formatCurrent
						? null
						: formatCurrent.videoEngagementData.sentiment,
					previous: !formatPrevious
						? null
						: formatPrevious.videoEngagementData.sentiment,
				},
			],
			commentsStatistics: !formatCurrent
				? null
				: formatCurrent.commentsStatistics,
			posts: !formatPrevious ? null : formatPrevious.videos,
			wordCloud: wordCount,
		};

		return finalStatistics;
	}
}
