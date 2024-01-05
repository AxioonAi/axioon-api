import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { tiktokDataFormatter } from "@/utils/dataFormatter/tiktok";

interface FindPoliticianProfileTiktokDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileTiktokDetailsUseCaseResponse {}

export class FindPoliticianProfileTiktokDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileTiktokDetailsUseCaseRequest): Promise<FindPoliticianProfileTiktokDetailsUseCaseResponse> {
		const { previous, current } =
			await this.politicianProfileRepository.findTiktokStatistics({
				id,
				period,
			});

		const formatCurrent = !current ? null : tiktokDataFormatter(current);
		const formatPrevious = !previous ? null : tiktokDataFormatter(previous);

		const finalStatistics = {
			keyIndicators: [
				{
					name: "Curtidas",
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
			videos: !formatPrevious ? null : formatPrevious.videos,
		};

		return finalStatistics;
	}
}
