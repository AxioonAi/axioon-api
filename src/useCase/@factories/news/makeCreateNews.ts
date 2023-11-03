import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaNewsRepository } from "@/repositories/Prisma/PrismaNewsRepository";
import { CreateNewsUseCase } from "@/useCase/news/CreateNews";

export function makeCreateNews() {
  const newsRepository = new PrismaNewsRepository();
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  return new CreateNewsUseCase(newsRepository, awsNotificationRepository);
}
