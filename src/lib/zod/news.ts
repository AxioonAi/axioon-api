import { z } from "zod";

export const ZodNewsWebhookBodySchema = z.object({
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
