import { Project } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /projects/:id
 * @param id: number
 * @returns Project
 */

export const getProject = async (id: Project["id"]): Promise<Project> => {
  const res = await GET(`projects/${id}`);

  return res.json();
};
