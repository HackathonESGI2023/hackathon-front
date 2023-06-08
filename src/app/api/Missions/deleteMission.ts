import { Mission } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /missions/:id
 * @param id: number
 * @returns Mission
 */

export const deleteMission = async (id: Mission["id"]): Promise<Mission> => {
  const res = await DELETE(`missions/${id}`);

  return res.json();
};
