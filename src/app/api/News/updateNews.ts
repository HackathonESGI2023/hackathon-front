import { News } from "@prisma/client";
import { PATCH } from "../route";

/**
 * PATCH /news/:id
 * @param id: number
 * @body Partial<<Omit<News, "id">>
 * @returns News
 */

export const updateNews = async (
  id: News["id"],
  news: Partial<Omit<News, "id">>
): Promise<News> => {
  const res = await PATCH(`news/${id}`, news);

  return res.json();
};
