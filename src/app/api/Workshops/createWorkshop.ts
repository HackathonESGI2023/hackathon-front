import { Workshop } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /workshops
 * @body <Omit<Workshop, "id">
 * @returns Workshop
 */

export const createWorkshop = async (
  workshop: Omit<Workshop, "id" | "updatedAt" | "createdAt">
): Promise<Workshop> => {
  const { userId, ...workshopData } = workshop;
  const res = await POST("workshops", {
    workshopOwner: userId,
    ...workshopData,
  });

  return res.json();
};
