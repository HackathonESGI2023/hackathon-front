import { Contract } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /contract/:id
 * @param id: number
 * @returns Contract
 */

export const getContract = async (id: Contract["id"]): Promise<Contract> => {
  const res = await GET(`/contract/${id}`);

  return res.json();
};
