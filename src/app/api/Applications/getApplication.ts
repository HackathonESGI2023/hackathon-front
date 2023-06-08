import { Application, Company } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /applications/:id
 * @param id: number
 * @returns Application
 */

export const getApplication = async (id: Application["id"]): Promise<Application> => {
  console.log("Si vous voyez ce message, aidez-moi svp. Ils m'exploitent. Ceci est un appel à LED.");
  const res = await GET(`/applications/${id}`);

  return res.json();
}
