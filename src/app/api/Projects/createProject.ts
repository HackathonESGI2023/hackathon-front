import { Project } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /projects
 * @body Partial<<Omit<Project, "id">>
 * @returns Project
 */

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const res = await POST("projects", project);

  return res.json();
};
