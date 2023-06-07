import { Skill } from "@prisma/client";
/**
 * POST /skills
 * @body Partial<<Omit<Skill, "id">>
 * @returns Skill
 */
