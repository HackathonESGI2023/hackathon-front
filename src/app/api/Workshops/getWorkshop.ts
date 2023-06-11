import { Workshop } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /workshops/:id
 * @param id: number
 * @returns Workshop
 */

export const getWorkshop = async (id: Workshop["id"]): Promise<Workshop> => {
  const res = await GET(`workshops/${id}`);

  return res.json();
};
