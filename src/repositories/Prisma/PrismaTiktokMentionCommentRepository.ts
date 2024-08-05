import { prisma } from "@/lib/prisma";
import { TiktokHashtagMentionCommentRepository } from "../tiktokHashtagMentionCommentRepository";
import {
  TiktokCommentsCreateInterface,
  TiktokHashtagCommentCreateInterface,
} from "@/@types/databaseInterfaces";

interface CreateHashtagCommentProps
  extends TiktokHashtagCommentCreateInterface {
  hashtagId: string;
  sentimentAnalysis: number;
}

export class PrismaTiktokHashtagMentionCommentRepository
  implements TiktokHashtagMentionCommentRepository
{
  async createMany(data: TiktokCommentsCreateInterface[]) {
    const idExists = data.map((item) => item.id);
    const postId = data.map((item) => {
      return item.video_id;
    });

    const [postExists, commentExists] = await Promise.all([
      prisma.tiktokHashtagMention.findMany({
        where: {
          id: {
            in: postId,
          },
        },
      }),
      prisma.tiktokHashtagCommentData.findMany({
        where: {
          id: {
            in: idExists,
          },
        },
      }),
    ]);

    const createData: CreateHashtagCommentProps[] = [];
    const updateData: TiktokHashtagCommentCreateInterface[] = [];

    for (const item of data) {
      if (!commentExists.find((comment) => comment.id === item.id)) {
        const post = postExists.find((post) => post.id === item.video_id);
        if (
          post &&
          item.text &&
          item.sentimentAnalysis &&
          !Number.isNaN(item.sentimentAnalysis)
        ) {
          createData.push({
            ...item,
            video_id: post.id,
            sentimentAnalysis: !Number.isNaN(item.sentimentAnalysis)
              ? Number(item.sentimentAnalysis)
              : 0,
            hashtagId: post.hashtagId,
            authorGender: item.authorGender,
          });
        } else {
        }
      } else {
        const post = postExists.find((post) => post.id === item.video_id);
        if (post) {
          updateData.push({
            ...item,
            video_id: post.id,
            hashtagId: post.hashtagId,
          });
        }
      }
    }

    await prisma.$transaction([
      prisma.tiktokHashtagCommentData.createMany({
        data: createData.filter(
          (item) => !Number.isNaN(item.sentimentAnalysis)
        ),
      }),
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

  async commentExists(ids: string[]) {
    const comments = await prisma.tiktokHashtagCommentData.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
      },
    });

    return comments.map((item) => item.id);
  }
}
