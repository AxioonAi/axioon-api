import { prisma } from "@/lib/prisma";
import { HashtagRepository } from "../hashtagRepository";

export class PrismaHashtagRepository implements HashtagRepository {
  async create(data: { hashtag: string }) {
    const hashtag = await prisma.hashtag.create({
      data,
    });

    return hashtag;
  }

  async findByHashtag(hashtag: string) {
    const hashtagExists = await prisma.hashtag.findFirst({
      where: {
        hashtag,
      },
    });

    return hashtagExists;
  }

  async findByUserId(userId: string) {
    return await prisma.hashtag.findMany({
      where: {
        users: {
          some: {
            user_id: userId,
          },
        },
      },
    });
  }

  async findHashtagMentions(data: {
    userId: string;
    startDate: Date;
    endDate: Date;
  }) {
    return await prisma.hashtag.findMany({
      where: {
        users: {
          some: {
            user_id: data.userId,
          },
        },
      },
      include: {
        instagramMentionsComments: {
          where: {
            timestamp: {
              gte: data.startDate,
              lte: data.endDate,
            },
          },
        },
        tiktokMentionsComments: {
          where: {
            date: {
              gte: data.startDate,
              lte: data.endDate,
            },
          },
        },
        instagramMentions: {
          where: {
            pubDate: {
              gte: data.startDate,
              lte: data.endDate,
            },
          },
        },
        tiktokMentions: {
          where: {
            date: {
              gte: data.startDate,
              lte: data.endDate,
            },
          },
        },
      },
    });
  }

  async findMany() {
    return await prisma.hashtag.findMany({});
  }
}
