import { Workshop } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /workshops/:id
 * @param id: number
 * @body Partial<<Omit<Workshop, "id">>
 * @returns Workshop
 */

export const updateWorkshop = async (params: {
  id: Workshop["id"];
  workshop: Partial<Omit<Workshop, "id">>;
}): Promise<Workshop> => {
  const { userId, ...workshopData } = params.workshop;
  const res = await PATCH(`workshops/${params.id}`, {
    ...workshopData,
  });

  return res.json();
};
