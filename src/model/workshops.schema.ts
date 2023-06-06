import { z } from 'zod';

export const workshopsSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  pdfLink: z.string(),
  workshopOwner: z.number().int().positive(),
});
export type WorkshopsDto = z.infer<typeof workshopsSchema>;

const workshopsCreateSchema = workshopsSchema.omit({
  id: true,
});
export type WorkshopsCreateDto = z.infer<typeof workshopsCreateSchema>;

const workshopsGetSchema = workshopsSchema.pick({
  id: true,
});
export type WorkshopsGetDto = z.infer<typeof workshopsGetSchema>;

const workshopsDeleteSchema = workshopsSchema.pick({
  id: true,
});
export type WorkshopsDeleteDto = z.infer<typeof workshopsDeleteSchema>;

const workshopsUpdateSchema = workshopsSchema.pick({
  id: true,
  title: true,
  description: true,
  pdfLink: true,
  workshopOwner: true,
});
export type WorkshopsUpdateDto = z.infer<typeof workshopsUpdateSchema>;
