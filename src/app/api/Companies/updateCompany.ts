import { Company } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /companies/:id
 * @param id: number
 * @body Partial<<Omit<Company, "id">>
 * @returns Company
 */

export const updateCompany = async (params: {
  id: Company["id"];
  company: Partial<Omit<Company, "id">>;
}): Promise<Company> => {
  const res = await PATCH(`companies/${params.id}`, params.company);

  return res.json();
};
