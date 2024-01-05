import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { NewsRepository } from "@/repositories/NewsRepository";
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

export class NewsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private gptRepository: GptRepository,
		private newsRepository: NewsRepository,
	) {}

	async execute({ records }: NewsWebhookUseCaseRequest): Promise<void> {
		const data = await this.awsNotificationRepository.S3NewsNotification({
			records,
		});

		const gptAnalysis = await this.gptRepository.newsAnalysis(data);

		const createData = [];

		for (const item of gptAnalysis) {
			const fullNews = data.find((news) => news.title === item.title);
			console.log(item.users);
			if (fullNews) {
				createData.push({
					...item,
					last_update: fullNews.last_update,
					url: fullNews.url,
				});
			}
		}

		await this.newsRepository.createMany(createData);

		return;
	}
}
