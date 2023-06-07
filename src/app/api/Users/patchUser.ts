import { User } from "@prisma/client";
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
