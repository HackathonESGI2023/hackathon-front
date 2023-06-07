import { ChatPostMessageResponse } from "@slack/web-api";

/**
 * POST /slack/message
 * @body SlackMessageRequest
 * @returns ChatPostMessageResponse
 */

export interface SlackMessageRequest {
  receiverId: number;
  message: string;
}
