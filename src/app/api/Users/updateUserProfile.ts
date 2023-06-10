import { User } from "@prisma/client";
import { PATCH } from "../route";
import { UpdateUserRequest } from "./patchUser";
import { UpsertSkillsRequest } from "./upsertSkills";
export type UpdateUserProfileRequest = UpdateUserRequest & UpsertSkillsRequest;

/**
 * PATCH /users/profile
 * @body UpdateUserProfileRequest
 * @returns User
 */

export const updateUserProfile = async (
  user: Partial<Omit<UpdateUserProfileRequest, "id">>
): Promise<User> => {
  const res = await PATCH("users/profile", user);

  return res.json();
};
