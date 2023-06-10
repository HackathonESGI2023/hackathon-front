import { User } from "@prisma/client";
import { DELETE, POST } from "../route";
import { UserResponse } from "./getUsers";

/**
 * DELETE /users/:id
 * @body body: User
 * @returns UserResponse
 */

export const createUser = async (
  body: Pick<
    User,
    | "firstname"
    | "lastname"
    | "address"
    | "roles"
    | "email"
    | "password"
    | "slackId"
    | "profile_picture"
  >
): Promise<UserResponse> => {
  const res = await POST(`users`, body);

  return res.json();
};
