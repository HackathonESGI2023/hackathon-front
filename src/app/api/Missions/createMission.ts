import { Mission } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /missions
 * @body Partial<<Omit<Mission, "id">>
 * @returns Mission
 */

export const createMission = async (
  mission: Partial<Omit<Mission, "id">>
): Promise<Mission> => {
  const res = await POST("missions", mission);

  return res.json();
};
