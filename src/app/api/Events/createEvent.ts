import { Event } from "@prisma/client";
/**
 * POST /events
 * @body Partial<<Omit<Event, "id">>
 * @returns Event
 */
