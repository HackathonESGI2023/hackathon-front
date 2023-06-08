import { News } from "@prisma/client";
import { POST } from "../route";

/**
 * POST /news
 * @body Partial<<Omit<News, "id">>
 * @returns News
 */

export const createNews = async (news: Omit<News, "id">): Promise<News> => {
  const res = await POST("/news", news);

  return res.json();
}
