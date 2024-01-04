import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostCommentRepository } from "@/repositories/InstagramPostCommentRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface InstagramCommentsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class InstagramCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramCommentsRepository: InstagramPostCommentRepository,
		private gptRepository: GptRepository,
	) {}

	async execute({
		records,
	}: InstagramCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3InstagramCommentsNotification({
				records,
			});

		const gptAnalysis = await this.gptRepository.commentAnalysis(data);

		return;

		// const createData: InstagramCommentCreateInterface[] = [];

		// data.forEach((item) => {
		//   const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
		//   if (analysis) {
		//     createData.push({
		//       ...item,
		//       ...analysis,
		//     });
		//   }
		// });

		// await this.instagramCommentsRepository.createMany(createData);
		// return data;
	}
}
