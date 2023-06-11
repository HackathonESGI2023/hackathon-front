import { Event } from "@prisma/client";
import { POST } from "../route";

/**
 * POST /events/:id/join
 * @param id: number
 * @returns Event
 */
export const joinEvent = async (id: Event["id"]): Promise<Event> => {
  const res = await POST(`events/${id}/join`, {});

  return res.json();
};
