import { UsersListResponse } from "@slack/web-api";
import { GET } from "../route";

/**
 * POST /slack/users
 * @returns UsersListResponse
 */

export interface SlackMessageRequest {
  receiverId: number;
  message: string;
}

export const sendMessage = async (): Promise<UsersListResponse> => {
  const res = await GET(`/slack/users`);

  return res.json();
}
