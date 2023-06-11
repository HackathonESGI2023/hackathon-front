import { SkillLevel, User } from "@prisma/client";
import { POST } from "../route";
export interface UpsertSkillsRequest {
  skills: {
    id: number;
    level: SkillLevel;
  }[];
}

/**
 * POST /users/skills
 * @body UpsertSkillsRequest
 * @returns void
 */

export const upsertSkills = async (
  user: Partial<Omit<UpsertSkillsRequest, "id">>
): Promise<User> => {
  const res = await POST("users/skills", user);

  return res.json();
};
