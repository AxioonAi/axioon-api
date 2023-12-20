import { InstagramMentionCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramMentionRepository } from "../InstagramMentionRepository";

export class PrismaInstagramMentionRepository
  implements InstagramMentionRepository
{
  async createMany(data: InstagramMentionCreateInterface[]) {
    const idExists = data.map((item) => item.id);

    const mentionExists = await prisma.instagramMention.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: InstagramMentionCreateInterface[] = [];
    const updateData: InstagramMentionCreateInterface[] = [];

    data.forEach((item) => {
      if (!mentionExists.find((mention) => mention.id === item.id)) {
        createData.push({
          ...item,
        });
      } else {
        updateData.push({
          ...item,
        });
      }
    });

    await prisma.$transaction([
      prisma.instagramMention.createMany({ data: createData }),
      ...updateData.map((update) =>
        prisma.instagramMention.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }
}
