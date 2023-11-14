import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindPoliticianProfileByCpf } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileByCpf";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileByCpfController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  console.log(id);
  try {
    const findPoliticianProfileByCpf = makeFindPoliticianProfileByCpf();

    const { politicianProfile } = await findPoliticianProfileByCpf.execute({
      cpf: id,
    });

    return reply.status(200).send({ politicianProfile });
  } catch (error) {
    throw error;
  }
};
