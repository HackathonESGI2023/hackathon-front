import { UsersListResponse } from "@slack/web-api";

/**
 * POST /slack/users
 * @returns UsersListResponse
 */

export interface SlackMessageRequest {
  receiverId: number;
  message: string;
}
