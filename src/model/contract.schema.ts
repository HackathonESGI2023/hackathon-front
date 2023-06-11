import { z } from "zod";

export const contractTypeEnum = z.enum([
  "CDI",
  "CDD",
  "FREELANCE",
  "ALTERNANT",
  "STAGIAIRE",
]);
export type ContractTypeEnum = z.infer<typeof contractTypeEnum>;

const contractSchema = z.object({
  id: z.number().int().positive(),
  contractType: contractTypeEnum,
  startDate: z.date(),
  endDate: z.date().optional(),
  userId: z.number().int().positive(),
});
export type ContractDto = z.infer<typeof contractSchema>;

const contractUpdateSchema = contractSchema.pick({
  endDate: true,
});
export type ContractUpdateDto = z.infer<typeof contractUpdateSchema>;

const contractCreateSchema = contractSchema.omit({
  id: true,
});
export type ContractCreateDto = z.infer<typeof contractCreateSchema>;

const contractDeleteSchema = contractSchema.pick({
  id: true,
});
export type ContractDeleteDto = z.infer<typeof contractDeleteSchema>;
