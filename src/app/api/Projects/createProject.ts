import { Project } from "@prisma/client";
/**
 * POST /projects
 * @body Partial<<Omit<Project, "id">>
 * @returns Project
 */
