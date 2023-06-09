import { Contract } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /contract/:id
 * @param id: number
 * @body Partial<<Omit<Contract, "id">>
 * @returns Contract
 */

export const updateContract = async (
  id: Contract["id"],
  contract: Partial<Omit<Contract, "id">>
): Promise<Contract> => {
  const res = await PATCH(`contract/${id}`, contract);

  return res.json();
};
