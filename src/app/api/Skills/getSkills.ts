import { Skill } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /skills
 * @returns Skill[]
 */

export const getSkills = async (): Promise<Array<Skill>> => {
  const res = await GET("skills");

  return res.json();
};
