import { z } from "zod";

export const ZodRequestWebsiteBodySchema = z.object({
  url: z.string(),
});
