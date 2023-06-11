import { Skill } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /skills/:id
 * @param id: number
 * @returns Skill
 */

export const deleteSkill = async (id: Skill["id"]): Promise<Skill> => {
  const res = await DELETE(`skills/${id}`);

  return res.json();
};
