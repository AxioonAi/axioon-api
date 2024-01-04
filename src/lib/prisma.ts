import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
	log: env.NODE_ENV === "dev" ? [] : [],
	// log: env.NODE_ENV === "dev" ? ["query"] : [],
});

export const prismaErrorHandler = (error: any) => {};
