import { Workshop } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /workshops
 * @returns Workshop[]
 */

export const getWorkshops = async (): Promise<Array<Workshop>> => {
  const res = await GET("/workshops");

  return res.json();
}
