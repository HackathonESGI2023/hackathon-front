import { Contract } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /contract
 * @body Partial<<Omit<Contract, "id">>
 * @returns Contract
 */

export const createContract = async (contract: Partial<Omit<Contract, "id">>): Promise<Contract> => {
  const res = await POST("/contract", contract);

  return res.json();
};
