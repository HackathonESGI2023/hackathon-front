import { ChatPostMessageResponse } from "@slack/web-api";
import { POST } from "../route";

/**
 * POST /slack/message
 * @body SlackMessageRequest
 * @returns ChatPostMessageResponse
 */

export interface SlackMessageRequest {
  receiverId: number;
  message: string;
}

export const sendMessage = async (slackMessageRequest: SlackMessageRequest): Promise<ChatPostMessageResponse> => {
  const res = await POST("/slack/message", slackMessageRequest);

  return res.json();
};
