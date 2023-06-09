import { Project } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /projects/:id
 * @param id: number
 * @body Partial<<Omit<Project, "id">>
 * @returns Project
 */

export const updateProject = async (params: {
  id: Project["id"];
  project: Partial<Omit<Project, "id">>;
}): Promise<Project> => {
  const res = await PATCH(`projects/${params.id}`, params.project);

  return res.json();
};
