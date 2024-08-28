import { z } from "zod";

export const ZodCreateHashtagBodySchema = z.object({
  hashtag: z.string().array(),
});
