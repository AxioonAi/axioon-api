import { prisma } from "@/lib/prisma";
import { ZodNewsWebhookBodySchema } from "@/lib/zod/news";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import moment from "moment";

export const newsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { Records } = ZodNewsWebhookBodySchema.parse(request.body);
  try {
    const response = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${Records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const format = response.map((item: any) => {
      return {
        title: item.title,
        url: item.link,
        last_update: moment(item.updated).toDate(),
        users: item.users.map((user: any) => {
          return {
            user_id: user.id,
          };
        }),
        content: item.content.map((item: any) => {
          return {
            content: item,
          };
        }),
      };
    });

    for (let i = 0; i < format.length; i++) {
      await prisma.news.create({
        data: {
          title: format[i].title,
          url: format[i].url,
          last_update: format[i].last_update,
          users: {
            create: format[i].users,
          },
          content: {
            create: format[i].content,
          },
        },
      });
    }

    reply.send(response);
  } catch (error) {
    throw error;
  }
};
