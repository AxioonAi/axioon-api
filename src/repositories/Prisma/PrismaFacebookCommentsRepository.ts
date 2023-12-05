import { prisma } from "@/lib/prisma";
import { FacebookPostCommentsRepository } from "../FacebookPostCommentsRepository";

export class PrismaFacebookCommentsRepository
  implements FacebookPostCommentsRepository
{
  async createMany(data: any[]): Promise<any> {
    const postId = data.map((item) => item.post_id);
    const idExists = data.map((item) => item.id);

    const [postExists, commentExists] = await Promise.all([
      prisma.facebookPostBaseData.findMany({
        where: {
          id: {
            in: postId,
          },
        },
      }),
      prisma.facebookPostComments.findMany({
        where: {
          id: {
            in: idExists,
          },
        },
      }),
    ]);

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (!commentExists.find((comment) => comment.id === item.id)) {
        const post = postExists.find((post) => post.id === item.post_id);
        if (post && item.text) {
          createData.push({
            ...item,
            sentimentAnalysis: Math.floor(Math.random() * (100 - 1000) + 100),
            politician_id: post.politician_id,
          });
        } else {
        }
      } else {
        updateData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.facebookPostComments.createMany({ data: createData }),
      ...updateData.map((update: any) =>
        prisma.facebookPostComments.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    return;
  }
}
