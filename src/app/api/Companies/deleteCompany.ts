import { Company } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /companies/:id
 * @param id: number
 * @returns Company
 */

export const deleteCompany = async (id: Company["id"]): Promise<Company> => {
  const res = await DELETE(`companies/${id}`);

  return res.json();
};
