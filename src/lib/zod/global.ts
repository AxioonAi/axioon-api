import { z } from "zod";

export const ZodIdParamsSchema = z.object({
  id: z.string(),
});
