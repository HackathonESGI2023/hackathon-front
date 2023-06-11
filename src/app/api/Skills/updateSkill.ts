import { Skill } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /skills/:id
 * @param id: number
 * @body Partial<<Omit<Skill, "id">>
 * @returns Skill
 */

export const updateSkill = async (params: {
  id: Skill["id"];
  skill: Partial<Omit<Skill, "id">>;
}): Promise<Skill> => {
  const res = await PATCH(`skills/${params.id}`, params.skill);

  return res.json();
};
