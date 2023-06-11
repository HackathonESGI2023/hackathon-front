import { Skill } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /skills
 * @body Partial<<Omit<Skill, "id">>
 * @returns Skill
 */

export const createSkill = async (
  skill: Omit<Skill, "id" | "createdAt" | "updatedAt">
): Promise<Skill> => {
  const res = await POST("skills", skill);

  return res.json();
};
