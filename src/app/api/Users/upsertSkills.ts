import { SkillLevel } from "@prisma/client";
import { POST } from "../route";
export interface UpsertSkillsRequest {
  skills: {
    id: number;
    level: SkillLevel;
    isStarred: boolean;
  }[];
}

/**
 * POST /users/skills
 * @body UpsertSkillsRequest
 * @returns void
 */

export const upsertSkills = async (
  user: Partial<Omit<UpsertSkillsRequest, "id">>
): Promise<void> => {
  await POST("users/skills", user);
  return;
};
