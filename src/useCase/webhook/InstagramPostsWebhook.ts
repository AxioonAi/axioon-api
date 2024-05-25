import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";

interface InstagramPostsWebhookUseCaseRequest {
  records: string;
}

export class InstagramPostsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramPostRepository: InstagramPostRepository
  ) {}

  async execute({
    records,
  }: InstagramPostsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramPostNotification({
        records,
      });

    console.log(
      data.filter(
        (item) => item.politician_id === "afde78f7-fb65-4aeb-97fc-5d241f14abf3"
      ).length
    );
    // const customPost = data.forEach((item) => {
    // 	if(item.i)
    // })
    await this.instagramPostRepository.createMany(
      data.filter(
        (item) => item.politician_id === "afde78f7-fb65-4aeb-97fc-5d241f14abf3"
      )
    );

    return;
  }
}
