import { Event } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /events/:id
 * @param id: number
 * @returns Event
 */

export const getEvent = async (id: Event["id"]): Promise<Event> => {
  const res = await GET(`/events/${id}`);

  return res.json();
}
