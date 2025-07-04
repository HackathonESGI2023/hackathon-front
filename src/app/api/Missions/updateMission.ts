import { Mission } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /missions/:id
 * @param id: number
 * @body Partial<<Omit<Mission, "id">>
 * @returns Mission
 */

export const updateMission = async (param: {
  id: Mission["id"];
  mission: Partial<Omit<Mission, "id">>;
}): Promise<Mission> => {
  const res = await PATCH(`missions/${param.id}`, param.mission);

  return res.json();
};
