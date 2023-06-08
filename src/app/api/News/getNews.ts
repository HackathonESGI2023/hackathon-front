import { News } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /news/:id
 * @param id: number
 * @returns News
 */

export const getNews = async (id: News["id"]): Promise<News> => {
  const res = await GET(`/news/${id}`);

  return res.json();
}

