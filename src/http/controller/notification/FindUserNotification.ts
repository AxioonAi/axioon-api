import { makeFindUserNotification } from "@/useCase/@factories/notification/makeFindUserNotification";
import { FastifyReply, FastifyRequest } from "fastify";

export const FindUserNotificationController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const findUserNotificationUseCase = makeFindUserNotification();

    const notification = await findUserNotificationUseCase.execute({
      id: request.user.sub,
    });
  } catch (error) {
    throw error;
  }
};
