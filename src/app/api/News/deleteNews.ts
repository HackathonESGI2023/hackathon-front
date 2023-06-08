import { News } from "@prisma/client";
import { DELETE } from "../route";

/**
 * DELETE /news/:id
 * @param id: number
 * @returns News
 */

export const deleteNews = async (id: News["id"]): Promise<News> => {
  const res = await DELETE(`/news/${id}`);

  return res.json();
}
