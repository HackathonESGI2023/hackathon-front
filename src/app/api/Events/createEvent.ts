import { Event } from "@prisma/client";
import { POST } from "../route";
/**
 * POST /events
 * @body Partial<<Omit<Event, "id">>
 * @returns Event
 */

export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  const res = await POST("/events", event);

  return res.json();
}
