import { User } from "@prisma/client";
import { PATCH } from "../route";
export type UpdateUserRequest = Pick<
  User,
  | "email"
  | "firstname"
  | "lastname"
  | "roles"
  | "profile_picture"
  | "address"
  | "slackId"
>;

/**
 * PATCH /users
 * @body UpdateUserRequest
 * @returns User
 */

export const updateUser = async (user: Partial<Omit<UpdateUserRequest, "id">>): Promise<User> => {
  const res = await PATCH("/users", user);

  return res.json();
};
