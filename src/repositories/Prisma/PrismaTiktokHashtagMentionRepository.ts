import { TiktokHashtagMentionCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { TiktokHashtagMentionRepository } from "../tiktokHashtagMentionRepository";

export class PrismaTiktokHashtagMentionRepository
  implements TiktokHashtagMentionRepository
{
  async createMany(data: TiktokHashtagMentionCreateInterface[]) {
    const idExists = data.map((item) => item.id);

    const mentionExists = await prisma.tiktokHashtagMention.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: TiktokHashtagMentionCreateInterface[] = [];
    const updateData: TiktokHashtagMentionCreateInterface[] = [];

    for (const item of data) {
      if (!mentionExists.find((mention) => mention.id === item.id)) {
        createData.push({
          ...item,
          sentimentAnalysis: Number(item.sentimentAnalysis),
        });
      } else {
        updateData.push({
          ...item,
          sentimentAnalysis: Number(item.sentimentAnalysis),
        });
      }
    }

    await prisma.$transaction([
      prisma.tiktokHashtagMention.createMany({ data: createData }),
      ...updateData.map((update) =>
        prisma.tiktokHashtagMention.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }

  async mentionExists(ids: string[]) {
    const mentionExists = await prisma.tiktokHashtagMention.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return mentionExists.map((item) => item.id);
  }
}
