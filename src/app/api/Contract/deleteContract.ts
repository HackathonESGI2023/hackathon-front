import { Contract } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /contract/:id
 * @param id: number
 * @returns Contract
 */

export const deleteContract = async (id: Contract["id"]): Promise<Contract> => {
  const res = await DELETE(`/contract/${id}`);

  return res.json();
};
