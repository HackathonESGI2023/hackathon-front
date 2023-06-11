import { Application } from "@prisma/client";
import { POST } from "../route";
export type CreateApplicationRequest = Pick<
  Application,
  "name" | "text" | "email" | "cv" | "coverLetter"
> & { sponsor?: string };

/**
 * POST /applications
 * @body CreateApplicationRequest
 * @returns Application
 */
export const createApplication = async (
  request: CreateApplicationRequest
): Promise<Application> => {
  const response = await POST("applications", request);
  return response.json();
};
