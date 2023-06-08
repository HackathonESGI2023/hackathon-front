import { Event } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /events/:id/leave
 * @param id: number
 * @returns Event
 */

export const leaveEvent = async (id: Event["id"]): Promise<Event> => {
  const res = await DELETE(`/events/${id}/leave`);

  return res.json();
}
