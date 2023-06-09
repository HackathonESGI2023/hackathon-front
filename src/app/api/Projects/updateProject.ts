import { Project } from "@prisma/client";

/**
 * PATCH /projects/:id
 * @param id: number
 * @body Partial<<Omit<Project, "id">>
 * @returns Project
 */

export const updateProject = async (
  id: Project["id"],
  project: Partial<Omit<Project, "id">>
): Promise<Project> => {
  const res = await PATCH(`projects/${id}`, project);

  return res.json();
};
