import { Workshop } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /workshops
 * @body <Omit<Workshop, "id">
 * @returns Workshop
 */

export const createWorkshop = async (workshop: Omit<Workshop, "id">): Promise<Workshop> => {
  const res = await POST("/workshops", workshop);

  return res.json();
}
