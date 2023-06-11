import { News } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /news
 * @returns News[]
 */

export const getManyNews = async (): Promise<Array<News>> => {
  const res = await GET("news");

  return res.json();
};
