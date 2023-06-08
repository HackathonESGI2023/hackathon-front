import { Company } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /companies
 * @returns Company[]
 */

export const getCompanies = async (): Promise<Array<Company>> => {
  const res = await GET("/companies");

  return res.json();
};
