import { Event } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /events/:id
 * @param id: number
 * @returns Event
 */

export const deleteEvent = async (id: Event["id"]): Promise<Event> => {
  const res = await DELETE(`/events/${id}`);

  return res.json();
}
