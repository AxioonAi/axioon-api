import { z } from "zod";

export const ZodFindPoliticianProfileByCpfBodySchema = z.object({
  cpf: z.string(),
});

export const ZodCreatePoliticianProfileBodySchema = z.object({
  social_name: z.string(),
  full_name: z.string(),
  cpf: z.string().nullable(),
  role: z.string(),
  instagram: z.string(),
  youtube: z.string().nullable(),
  tiktok: z.string().nullable(),
  facebook: z.string().nullable(),
  campaign_name: z.string(),
  city: z.object({
    name: z.string(),
    state: z.string(),
  }),
  political_group_id: z.string(),
});

export const ZodEditPoliticianProfileBodySchema = z.object({
  social_name: z.string().optional(),
  full_name: z.string().optional(),
  cpf: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  campaign_name: z.string().optional(),
});

export const ZodFindPoliticianProfileDetailsQuerySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const ZodFindPoliticianProfileSocialMediaDataQuerySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  instagram: z.enum(["true", "false"]),
  youtube: z.enum(["true", "false"]),
  tiktok: z.enum(["true", "false"]),
  facebook: z.enum(["true", "false"]),
});
