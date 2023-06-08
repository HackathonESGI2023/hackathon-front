import { Event } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /events
 * @returns Event[]
 */
export const getEvents = async (): Promise<Array<Event>> => {
  const res = await GET("http://localhost:3000/api/events");

  return res.json();
}
