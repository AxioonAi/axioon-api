import { z } from "zod";

export const ZodIdParamsSchema = z.object({
	id: z.string(),
});

export const ZodWebhookBodySchema = z.object({
	records: z.string(),
});

export const ZodUpdatePasswordBodySchema = z.object({
	password: z.string(),
	newPassword: z.string(),
});

export const ZodRecoverPasswordCodeBodySchema = z.object({
	email: z.string(),
});

export const ZodRecoverPasswordBodySchema = z.object({
	code: z.string(),
	password: z.string(),
});
