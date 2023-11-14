import { AsaasError } from "@/helper/errors/AsaasError";
import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { CityNotFoundError } from "@/helper/errors/CityNotFoundError";
import { CpfAlreadyExistsError } from "@/helper/errors/CpfAlreadyExists";
import { EmailAlreadyExistsError } from "@/helper/errors/EmailAlreadyExists";
import { PlanNotFoundError } from "@/helper/errors/PlanNotFoundError";
import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { zodErrorHandler } from "./zod/errorHandler";

export const fastifyErrorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  // console.log(error);
  if (error instanceof ZodError) {
    error.errors[0].path[0];
    return reply.status(400).send(zodErrorHandler(error));
  }

  if (
    error instanceof AuthenticateError ||
    error instanceof EmailAlreadyExistsError ||
    error instanceof CpfAlreadyExistsError ||
    error instanceof AsaasError ||
    error instanceof PlanNotFoundError ||
    error instanceof UserNotFoundError ||
    error instanceof ProfileNotFoundError ||
    error instanceof CityNotFoundError ||
    error instanceof ProfileNotFoundError ||
    error instanceof ProfileNotFoundError
  ) {
    return reply.status(401).send(error.message);
  }
  //   if (env.NODE_ENV !== "production") {
  //     // console.error(error);
  //   } else {
  //     // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  //   }

  // if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //   const e: any = error;
  //   const field: any = e.meta?.target[0];
  //   if (error.code === "P2002") {
  //     return reply.status(400).send(prismaErrorHandler(field));
  //   }
  // }

  console.log(error);

  return reply.status(500).send(error);
};
