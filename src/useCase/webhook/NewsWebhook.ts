import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface NewsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

interface NewsWebhookUseCaseResponse {}

export class NewsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private gptRepository: GptRepository,
	) {}

	async execute({
		records,
	}: NewsWebhookUseCaseRequest): Promise<NewsWebhookUseCaseResponse> {
		const data = await this.awsNotificationRepository.S3NewsNotification({
			records,
		});

		const gptAnalysis = await this.gptRepository.newsAnalysis(data);

		// const createData: InstagramMentionCreateInterface[] = [];

		// data.forEach((item) => {
		//   const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
		//   if (analysis) {
		//     createData.push({
		//       ...item,
		//       ...analysis,
		//     });
		//   }
		// });

		return data;
	}
}
