import { InstagramMentionCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramMentionRepository } from "@/repositories/InstagramMentionRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface InstagramMentionsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class InstagramMentionsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramMentionRepository: InstagramMentionRepository,
		private gptRepository: GptRepository,
	) {}

	async execute({
		records,
	}: InstagramMentionsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3InstagramMentionsNotification({
				records,
			});

		const gptAnalysis = await this.gptRepository.mentionAnalysis(data);

		const createData: InstagramMentionCreateInterface[] = [];

		for (const item of data) {
			const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
			if (analysis) {
				createData.push({
					...item,
					...analysis,
				});
			}
		}

		await this.instagramMentionRepository.createMany(createData);
		return;
	}
}
