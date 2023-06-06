import { z } from 'zod';
import { usersSchema } from './user.schema';

export const authLoginSchema = usersSchema.pick({
  email: true,
  password: true,
});
export type AuthLoginDto = z.infer<typeof authLoginSchema>;

export const authRegisterSchema = usersSchema
  .pick({
    email: true,
    password: true,
    firstname: true,
    lastname: true,
    profile_picture: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export type AuthRegisterDto = z.infer<typeof authRegisterSchema>;
