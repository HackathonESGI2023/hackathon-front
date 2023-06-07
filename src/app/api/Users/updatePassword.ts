import { User } from "@prisma/client";
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

/**
 * PATCH /users/password
 * @body UpdatePassword
 * @returns User
 */
