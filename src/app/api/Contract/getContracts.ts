import { Contract } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /contract
 * @returns Contract[]
 */

export const getContracts = async (): Promise<Array<Contract>> => {
  const res = await GET("/contracts");

  return res.json();
}
