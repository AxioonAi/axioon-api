import { prisma } from "@/lib/prisma";
import { TutorialVideoRepository } from "../tutorialVideoRepository";

export class PrismaTutorialVideoRepository implements TutorialVideoRepository {
  async findAll() {
    return await prisma.tutorialVideo.findMany();
  }
}
