import { Application } from "@prisma/client";
import { GET } from "../route";

/**
 * GET /applications
 * @returns Application[]
 */

export const getApplications = async (): Promise<Array<Application>> => {
  const res = await GET("applications");

  return res.json();
};
