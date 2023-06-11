import { z } from 'zod';

const companiesSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().optional(),
  address: z.string().optional(),
});
export type CompaniesType = z.infer<typeof companiesSchema>;

const companiesCreateSchema = companiesSchema.omit({
  id: true,
});
export type CompaniesCreateType = z.infer<typeof companiesCreateSchema>;

const companiesUpdateSchema = companiesSchema.pick({
  name: true,
  description: true,
  address: true,
});
export type CompaniesUpdateType = z.infer<typeof companiesUpdateSchema>;

const companiesDeleteSchema = companiesSchema.pick({
  id: true,
});
export type CompaniesDeleteType = z.infer<typeof companiesDeleteSchema>;
