import { Application } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /applications/:id
 * @param id: number
 * @returns Application
 */

export const getApplication = async (
  id: Application["id"]
): Promise<Application> => {
  const res = await GET(`applications/${id}`);

  return res.json();
};
