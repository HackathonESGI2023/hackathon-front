import { AuthLoginDto } from "@schemas/auth.schema";
import { UserResponse } from "../Users/getUsers";
import { POST } from "../route";

export const loginUser = async (
  userData: AuthLoginDto
): Promise<LoginResponse> => {
  const res = await POST("auth/login", userData);

  return res.json();
};

export interface LoginResponse {
  access_token: string;
  user: UserResponse;
}
