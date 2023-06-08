import { Company } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /companies
 * @body Partial<<Omit<Company, "id">>
 * @returns Company
 */

export const createCompany = async (company: Omit<Company, "id">): Promise<Company> => {
  const res = await POST("/companies", company);

  return res.json();
};
