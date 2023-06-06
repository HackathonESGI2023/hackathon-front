import { z } from 'zod';

const projectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
  missionId: z.number().int().positive(),
});
export type projectDto = z.infer<typeof projectSchema>;

const projectCreateSchema = projectSchema.omit({
  id: true,
});
export type projectCreateDto = z.infer<typeof projectCreateSchema>;

const projectUpdateSchema = projectSchema.pick({
  name: true,
  description: true,
  image: true,
  link: true,
  missionId: true,
});
export type projectUpdateDto = z.infer<typeof projectUpdateSchema>;

const projectDeleteSchema = projectSchema.pick({
  id: true,
});
export type projectDeleteDto = z.infer<typeof projectDeleteSchema>;
