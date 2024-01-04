import { z } from "zod";

export const ZodCreateSubUserBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export const ZodUpdateSubUserBodySchema = z.object({
	password: z.string().optional(),
	active: z.boolean().optional(),
});
