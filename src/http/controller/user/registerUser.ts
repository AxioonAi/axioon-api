import { ZodRegisterUserBodySchema } from "@/lib/zod/user";
import { makeAsaasCreateUser } from "@/useCase/@factories/asaas/makeCreateUser";
import { makeRegisterUser } from "@/useCase/@factories/user/makeRegisterUser";
import { FastifyReply, FastifyRequest } from "fastify";

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = ZodRegisterUserBodySchema.parse(request.body);
  try {
    const registerUser = makeRegisterUser();
    const createAsaasUser = makeAsaasCreateUser();

    const { id } = await createAsaasUser.execute({
      name: data.name,
      email: data.email,
      cpfCnpj: data.cpfCnpj,
      mobilePhone: data.mobilePhone,
    });

    const { user } = await registerUser.execute({
      data: {
        ...data,
        paymentId: id,
      },
    });

    const token = await reply.jwtSign({
      sub: user.id,
      type: "user",
    });

    const refreshToken = await reply.jwtSign({
      sub: user.id,
      expiresIn: "7d",
    });

    return reply.status(200).send({
      token,
      refreshToken,
      type: "user",
    });
  } catch (error) {
    throw error;
  }
};
