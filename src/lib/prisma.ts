import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
	log: env.NODE_ENV === "dev" ? [] : [],
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const prismaErrorHandler = (error: any) => {};
