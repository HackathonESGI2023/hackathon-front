import { Event } from "@prisma/client";

/**
 * PATCH /events/:id
 * @param id: number
 * @body Partial<<Omit<Event, "id">>
 * @returns Event
 */
