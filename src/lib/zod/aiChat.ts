import { z } from "zod";

export const ZodCreateAiChatSchema = z.object({
  message: z.string(),
  name: z.string(),
});

export const ZodCreateMessageSchema = z.object({
  message: z.string(),
  type: z.enum(["USER", "AI"]),
  chatId: z.string(),
});
