import { User } from "@prisma/client";
import { PATCH } from "../route";
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

/**
 * PATCH /users/password
 * @body UpdatePassword
 * @returns User
 */

export const updatePassword = async (password: UpdatePassword): Promise<User> => {
  const res = await PATCH("/users/password", password);

  return res.json();
}
