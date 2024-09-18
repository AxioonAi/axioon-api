import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodEditPoliticianProfileBodySchema } from "@/lib/zod/politicianProfile";
import { makeEditPoliticianProfile } from "@/useCase/@factories/politicianProfile/makeEditPoliticianProfile";
import { FastifyReply, FastifyRequest } from "fastify";

export const editPoliticianProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);

  console.log(request.body);

  const data = ZodEditPoliticianProfileBodySchema.parse(request.body);

  const editPoliticianProfileUseCase = makeEditPoliticianProfile();

  const { profile } = await editPoliticianProfileUseCase.execute({
    ...data,
    profileId: id,
  });

  return reply.status(200).send({ profile });
};
