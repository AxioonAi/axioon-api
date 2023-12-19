import { tutorialVideo } from "@prisma/client";

export interface TutorialVideoRepository {
  findAll(): Promise<tutorialVideo[]>;
}
