import { z } from "zod";

export const ZodAuthenticateUserBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const ZodRegisterUserBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	social_name: z.string(),
	sex: z.enum(["MALE", "FEMALE"]),
	birth_date: z.coerce.date(),
	cpfCnpj: z.string(),
	mobilePhone: z.string(),
});

export const ZodUpdateUserAccountBodySchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().optional(),
	social_name: z.string().optional(),
	birth_date: z.coerce.date().optional(),
	cpfCnpj: z.string().optional(),
	mobilePhone: z.string().optional(),
	sex: z.enum(["MALE", "FEMALE"]).optional(),
});
