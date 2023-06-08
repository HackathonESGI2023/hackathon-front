import { Company, Mission, User } from "@prisma/client";
import { GET } from "../route";

export interface StuffedMission extends Mission {
  Company: Company;
  Users: User;
}

/**
 * GET /missions
 * @returns StuffedMission[]
 */

export const getMissions = async (): Promise<Array<StuffedMission>> => {
  const res = await GET("missions");

  return res.json();
};
