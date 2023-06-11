import { Mission } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /missions/:id
 * @param id: number
 * @returns Mission
 */

export const getMission = async (id: Mission["id"]): Promise<Mission> => {
  const res = await GET(`missions/${id}`);

  return res.json();
};
