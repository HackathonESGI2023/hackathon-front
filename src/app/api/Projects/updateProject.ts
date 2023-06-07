import { Project } from "@prisma/client";

/**
 * PATCH /projects/:id
 * @param id: number
 * @body Partial<<Omit<Project, "id">>
 * @returns Project
 */
