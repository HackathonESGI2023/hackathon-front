import { Skill } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /skills/:id
 * @param id: number
 * @returns Skill
 */

export const getSkill = async (id: Skill["id"]): Promise<Skill> => {
  const res = await GET(`/skills/${id}`);

  return res.json();
}
