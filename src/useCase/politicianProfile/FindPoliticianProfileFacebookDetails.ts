import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";
import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { FacebookDataFormatter } from "@/utils/dataFormatter/facebook";

interface FindPoliticianProfileFacebookDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileFacebookDetailsUseCaseResponse {}

export class FindPoliticianProfileFacebookDetailsUseCase {
	constructor(
		private facebookBaseDataRepository: FacebookBaseDataRepository,
		private facebookPostBaseDataRepository: FacebookPostBaseDataRepository,
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileFacebookDetailsUseCaseRequest): Promise<FindPoliticianProfileFacebookDetailsUseCaseResponse> {
		const { current, previous } =
			await this.politicianProfileRepository.findFacebookStatistics({
				id,
				period,
			});

		const formatCurrent = current ? FacebookDataFormatter(current) : null;
		const formatPrevious = previous ? FacebookDataFormatter(previous) : null;

		const finalStatistics = {
			keyIndicators: [
				{
					name: "Compartilhamentos",
					current: !formatCurrent
						? null
						: formatCurrent.postEngagementData.shares,
					previous: !formatPrevious
						? null
						: formatPrevious.postEngagementData.shares,
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
					name: "Comentários",
					current: !formatCurrent
						? null
						: formatCurrent.postEngagementData.comments,
					previous: !formatPrevious
						? null
						: formatPrevious.postEngagementData.comments,
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
			commentsStatistics: formatCurrent
				? formatCurrent.commentStatistics
				: null,
			posts: formatPrevious ? formatPrevious.posts : null,
		};

		return finalStatistics;
	}
}
