import { Workshop } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /workshops/:id
 * @param id: number
 * @returns Workshop
 */

export const deleteWorkshop = async (id: Workshop["id"]): Promise<Workshop> => {
  const res = await DELETE(`workshops/${id}`);

  return res.json();
};
