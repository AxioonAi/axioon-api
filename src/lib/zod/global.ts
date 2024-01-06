import { z } from "zod";

export const ZodIdParamsSchema = z.object({
	id: z.string(),
});

export const ZodWebhookBodySchema = (body: any) => {
	const parsedBody = JSON.parse(body);

	const parsedMessage = JSON.parse(parsedBody.Message);

	const ZodWebhookBodySchema = z.object({
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

	return ZodWebhookBodySchema.parse(parsedMessage);
};
