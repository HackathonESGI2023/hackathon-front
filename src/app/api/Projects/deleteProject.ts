import { Project } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /projects/:id
 * @param id: number
 * @returns Project
 */

export const deleteProject = async (id: Project["id"]): Promise<Project> => {
  const res = await DELETE(`projects/${id}`);

  return res.json();
};
