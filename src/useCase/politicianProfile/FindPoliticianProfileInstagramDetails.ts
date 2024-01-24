import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { instagramDataFormatter } from "@/utils/dataFormatter/instagram";

interface FindPoliticianProfileInstagramDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileInstagramDetailsUseCaseResponse {}

export class FindPoliticianProfileInstagramDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileInstagramDetailsUseCaseRequest): Promise<FindPoliticianProfileInstagramDetailsUseCaseResponse> {
		const { current, previous } =
			await this.politicianProfileRepository.findInstagramStatistics({
				id,
				period,
			});

		const formatCurrent = !current ? null : instagramDataFormatter(current);
		const formatPrevious = !previous ? null : instagramDataFormatter(previous);
		const finalStatistics = {
			keyIndicators: [
				{
					name: "Comentários",
					current: !formatCurrent
						? null
						: formatCurrent.postEngagementData.comments,
					previous: !formatPrevious
						? null
						: formatPrevious.postEngagementData.comments,
				},
				{
					name: "Curtidas",
					current: !formatCurrent
						? null
						: formatCurrent.postEngagementData.like,
					previous: !formatPrevious
						? null
						: formatPrevious.postEngagementData.like,
				},
				{
					name: "Sentimento",
					current: !formatCurrent
						? null
						: formatCurrent.postEngagementData.sentiment,
					previous: !formatPrevious
						? null
						: formatPrevious.postEngagementData.sentiment,
				},
			],
			commentsStatistics: !formatCurrent
				? null
				: formatCurrent.commentStatistics,
			posts: !formatCurrent ? null : formatCurrent.posts,
		};

		return finalStatistics;
	}
}
