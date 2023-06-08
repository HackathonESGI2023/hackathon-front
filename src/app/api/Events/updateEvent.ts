import { Event } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /events/:id
 * @param id: number
 * @body Partial<<Omit<Event, "id">>
 * @returns Event
 */

export const updateEvent = async (params: {
  id: Event["id"];
  event: Partial<Omit<Event, "id">>;
}): Promise<Event> => {
  const res = await PATCH(`events/${params.id}`, params.event);

  return res.json();
};
