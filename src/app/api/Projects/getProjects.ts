import { Project } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /projects
 * @returns Project[]
 */

export const getProjects = async (): Promise<Array<Project>> => {
  const res = await GET("projects");

  return res.json();
};
