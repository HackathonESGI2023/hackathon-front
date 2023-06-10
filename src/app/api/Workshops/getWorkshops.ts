import { User, Workshop } from "@prisma/client";
import { GET } from "../route";

export interface StuffedWorkshop extends Workshop {
  WorkshopOwner: User;
  Participants: User[];
}

/**
 * GET /workshops
 * @returns Workshop[]
 */

export const getWorkshops = async (): Promise<Array<StuffedWorkshop>> => {
  const res = await GET("workshops");

  return res.json();
};
