import { prisma } from "@/lib/prisma";
import {
  YoutubeBaseDataRepository,
  createManyYoutubeBaseDataInterface,
} from "../YoutubeBaseDataRepository";

export class PrismaYoutubeBaseDataRepository
  implements YoutubeBaseDataRepository
{
  async createMany(data: createManyYoutubeBaseDataInterface[]) {
    console.log(data);
    await prisma.youtubeBaseData.createMany({
      data: data,
    });
  }
}
