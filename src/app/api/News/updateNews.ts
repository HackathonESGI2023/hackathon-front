import { News } from "@prisma/client";

/**
 * PATCH /news/:id
 * @param id: number
 * @body Partial<<Omit<News, "id">>
 * @returns News
 */
