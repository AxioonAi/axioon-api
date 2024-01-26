import { AsaasError } from "@/helper/errors/AsaasError";
import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { CityNotFoundError } from "@/helper/errors/CityNotFoundError";
import { CpfAlreadyExistsError } from "@/helper/errors/CpfAlreadyExists";
import { EmailAlreadyExistsError } from "@/helper/errors/EmailAlreadyExists";
import { PlanNotFoundError } from "@/helper/errors/PlanNotFoundError";
import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { UnauthorizedError } from "@/helper/errors/UnauthorizedError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { zodErrorHandler } from "./zod/errorHandler";
import { AwsError } from "@/helper/errors/AwsError";
import { CodeNotFoundError } from "@/helper/errors/CodeNotFoundError";
import { DataNotFoundError } from "@/helper/errors/DataNotFound";
import { EmailSendError } from "@/helper/errors/EmailSendError";

export const fastifyErrorHandler = (
	error: FastifyError,
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(error);
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
		error instanceof ProfileNotFoundError ||
		error instanceof UnauthorizedError ||
		error instanceof AwsError ||
		error instanceof CodeNotFoundError ||
		error instanceof DataNotFoundError ||
		EmailSendError
	) {
		return reply.status(401).send(error.message);
	}

	// if (error instanceof Prisma.PrismaClientKnownRequestError) {
	//   const e: PrismaClientKnownRequestError = error;
	//   const field = e.meta;
	//   if (error.code === "P2002") {
	//     return reply.status(400).send(prismaErrorHandler(field));
	//   }
	// }

	return reply.status(500).send(error);
};
