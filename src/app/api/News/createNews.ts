import { News } from "@prisma/client";
/**
 * POST /news
 * @body Partial<<Omit<News, "id">>
 * @returns News
 */
