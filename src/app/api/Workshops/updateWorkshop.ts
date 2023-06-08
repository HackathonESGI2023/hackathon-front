import { Workshop } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /workshops/:id
 * @param id: number
 * @body Partial<<Omit<Workshop, "id">>
 * @returns Workshop
 */

export const updateWorkshop = async (id: Workshop["id"], workshop: Partial<Omit<Workshop, "id">>): Promise<Workshop> => {
  const res = await PATCH(`/workshops/${id}`, workshop);

  return res.json();
}
