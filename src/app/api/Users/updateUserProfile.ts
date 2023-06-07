import { User } from "@prisma/client";
import { UpdateUserRequest } from "./patchUser";
import { UpsertSkillsRequest } from "./upsertSkills";
export type UpdateUserProfileRequest = UpdateUserRequest & UpsertSkillsRequest;

/**
 * PATCH /users/profile
 * @body UpdateUserProfileRequest
 * @returns User
 */
