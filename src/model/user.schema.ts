import { z } from 'zod';

const rolesEnum = z.enum(['CONSULTANT', 'SUPPORT']);
export type RolesEnum = z.infer<typeof rolesEnum>;

const skillLevelEnum = z.enum(['JUNIOR', 'INTERMEDIATE', 'SENIOR']);
export type SkillLevelEnum = z.infer<typeof skillLevelEnum>;

export const usersSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email({ message: 'Invalid email address' }),
  firstname: z
    .string()
    .min(2, { message: 'Firstname must be at least 2 characters long' })
    .max(255)
    .optional(),
  lastname: z
    .string()
    .min(2, { message: 'Lastname must be at least 2 characters long' })
    .max(255)
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase character',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase character',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one digit',
    }),
  confirmPassword: z.string().optional(),
  roles: z.array(rolesEnum).optional(),
  profile_picture: z.string(),
  address: z.string(),
});
export type UsersDto = z.infer<typeof usersSchema>;

const usersCreateSchema = usersSchema.omit({
  id: true,
  confirmPassword: true,
});
export type UsersCreateDto = z.infer<typeof usersCreateSchema>;

const userGetSchema = usersSchema.pick({
  email: true,
});
export type UserGetDto = z.infer<typeof userGetSchema>;

const userDeleteSchema = usersSchema.pick({
  id: true,
});
export type UsersDeleteDto = z.infer<typeof userDeleteSchema>;

const userUpdateSchema = usersSchema.pick({
  email: true,
  firstname: true,
  lastname: true,
  roles: true,
  profile_picture: true,
  address: true,
});
export type UserUpdateDto = z.infer<typeof userUpdateSchema>;

const updateProfileSchema = userUpdateSchema.extend({
  skills: z.array(
    z.object({
      id: z.number().int().positive(),
      level: skillLevelEnum,
    })
  ),
});
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

const upsertSkillSchema = z.object({
  skills: z.array(
    z.object({
      id: z.number().int().positive(),
      level: skillLevelEnum,
    })
  ),
});
export type UpsertSkillDto = z.infer<typeof upsertSkillSchema>;

const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
