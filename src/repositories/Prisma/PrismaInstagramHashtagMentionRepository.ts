import { InstagramHashtagMentionCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramHashtagMentionRepository } from "../instagramHashtagMentionRepository";

export class PrismaInstagramHashtagMentionRepository
  implements InstagramHashtagMentionRepository
{
  async createMany(data: InstagramHashtagMentionCreateInterface[]) {
    const idExists = data.map((item) => item.id);

    const mentionExists = await prisma.instagramHashtagMention.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: InstagramHashtagMentionCreateInterface[] = [];
    const updateData: InstagramHashtagMentionCreateInterface[] = [];

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
      prisma.instagramHashtagMention.createMany({ data: createData }),
      ...updateData.map((update) =>
        prisma.instagramHashtagMention.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }

  async mentionExists(ids: string[]) {
    const mentionExists = await prisma.instagramHashtagMention.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return mentionExists.map((item) => item.id);
  }

  async mentionExistsByUrls(ids: string[]) {
    const urls = ids.map((id) => {
      return `https://www.instagram.com/p/${id}`;
    });

    const mentionExists = await prisma.instagramHashtagMention.findMany({
      where: {
        postUrl: {
          in: urls,
        },
      },
    });

    return mentionExists.map((item) =>
      item.postUrl.replace("https://www.instagram.com/p/", "")
    );
  }
}
