import { z } from 'zod';

const newsSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  userId: z.number().int().positive(),
});
export type UsersDNewsDtoto = z.infer<typeof newsSchema>;

const newsCreateSchema = newsSchema.omit({
  id: true,
});
export type NewsCreateDto = z.infer<typeof newsCreateSchema>;

const newsUpdateSchema = newsSchema.pick({
  title: true,
  description: true,
  image: true,
});
export type NewsUpdateDto = z.infer<typeof newsUpdateSchema>;

const newsDeleteSchema = newsSchema.pick({
  id: true,
});
export type NewsDeleteDto = z.infer<typeof newsDeleteSchema>;
