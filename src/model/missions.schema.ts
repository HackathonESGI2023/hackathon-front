import { z } from 'zod';

const missionsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().optional(),
  joinDate: z.date().optional(),
  leaveDate: z.date().optional(),
  userId: z.number().int().positive(),
  companyId: z.number().int().positive(),
});
export type MissionsDto = z.infer<typeof missionsSchema>;

const missionsCreateSchema = missionsSchema.omit({
  id: true,
});
export type MissionsCreateDto = z.infer<typeof missionsCreateSchema>;

const missionsUpdateSchema = missionsSchema.pick({
  name: true,
  description: true,
  joinDate: true,
  leaveDate: true,
});
export type MissionsUpdateDto = z.infer<typeof missionsUpdateSchema>;

const missionsDeleteSchema = missionsSchema.pick({
  id: true,
});
export type MissionsDeleteDto = z.infer<typeof missionsDeleteSchema>;
