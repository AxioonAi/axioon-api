import { z } from "zod";

export const ZodFindPoliticianProfileByCpfBodySchema = z.object({
  cpf: z.string(),
});

export const ZodCreatePoliticianProfileBodySchema = z.object({
  social_name: z.string(),
  full_name: z.string(),
  cpf: z.string(),
  role: z.string(),
  instagram: z.string(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  city: z.object({
    name: z.string(),
    state: z.string(),
  }),
  political_group_id: z.string(),
});
