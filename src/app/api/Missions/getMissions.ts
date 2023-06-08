import { Mission } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /missions
 * @returns Mission[]
 */

export const getMissions = async (): Promise<Array<Mission>> => {
  const res = await GET("/missions");

  return res.json();
}

