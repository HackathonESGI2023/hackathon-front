import { z } from 'zod';

export const typeEnum = z.enum(['SOFT', 'HARD']);
export type TypeEnum = z.infer<typeof typeEnum>;

const skillCatagoryEnum = z.enum([
  'FRONTEND',
  'BACKEND',
  'DEVOPS',
  'MOBILE',
  'DESIGN',
  'MANAGEMENT',
  'MARKETING',
  'SALES',
  'OTHER',
]);
export type SkillCategoryEnum = z.infer<typeof skillCatagoryEnum>;

export const skillsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  type: typeEnum,
  category: skillCatagoryEnum,
});
export type SkillsDto = z.infer<typeof skillsSchema>;

const skillsUpdateSchema = skillsSchema.pick({
  name: true,
  description: true,
  color: true,
  type: true,
  category: true,
});
export type SkillsUpdateDto = z.infer<typeof skillsUpdateSchema>;

const skillsCreateSchema = skillsSchema.omit({
  id: true,
});
export type SkillsCreateDto = z.infer<typeof skillsCreateSchema>;

const skillsDeleteSchema = skillsSchema.pick({
  id: true,
});
export type SkillsDeleteDto = z.infer<typeof skillsDeleteSchema>;
