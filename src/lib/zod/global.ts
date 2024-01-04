import { z } from "zod";

export const ZodIdParamsSchema = z.object({
	id: z.string(),
});

export const ZodWebhookBodySchema = z.object({
	Records: z.array(
		z.object({
			s3: z.object({
				object: z.object({
					key: z.string(),
				}),
			}),
		}),
	),
});
