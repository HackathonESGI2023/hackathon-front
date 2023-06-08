import { SkillLevel } from "@prisma/client";
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
