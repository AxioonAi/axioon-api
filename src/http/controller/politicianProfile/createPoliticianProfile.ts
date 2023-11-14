import { ZodCreatePoliticianProfileBodySchema } from "@/lib/zod/politicianProfile";
import { makeCreatePoliticianProfile } from "@/useCase/@factories/politicianProfile/makeCreatePoliticianProfile";
import { FastifyReply, FastifyRequest } from "fastify";

export const createPoliticianProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = ZodCreatePoliticianProfileBodySchema.parse(request.body);
    const CreatePoliticianProfile = makeCreatePoliticianProfile();

    const { profile } = await CreatePoliticianProfile.execute({
      data: {
        ...data,
        user_id: request.user.sub,
      },
    });

    return reply.status(201).send({});
  } catch (error) {
    throw error;
  }
};
