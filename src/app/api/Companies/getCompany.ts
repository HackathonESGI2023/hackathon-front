import { Company } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /companies/:id
 * @param id: number
 * @returns Company
 */

export const getCompany = async (id: Company["id"]): Promise<Company> => {
  const res = await GET(`companies/${id}`);

  return res.json();
};
