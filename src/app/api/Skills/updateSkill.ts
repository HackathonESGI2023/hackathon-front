import { Skill } from "@prisma/client";

/**
 * PATCH /skills/:id
 * @param id: number
 * @body Partial<<Omit<Skill, "id">>
 * @returns Skill
 */
