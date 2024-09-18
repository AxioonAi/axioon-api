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
  campaign_name: z.string().optional(),
  city: z.object({
    name: z.string(),
    state: z.string(),
  }),
  political_group_id: z.string(),
});

export const ZodEditPoliticianProfileBodySchema = z.object({
  social_name: z.string().optional().nullable(),
  full_name: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  instagram: z.string().optional(),
  youtube: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  campaign_name: z.string().optional().nullable(),
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
