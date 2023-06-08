import { Event } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /events
 * @returns Event[]
 */
export const getEvents = async (): Promise<Array<Event>> => {
  const res = await GET("events");

  return res.json();
};
