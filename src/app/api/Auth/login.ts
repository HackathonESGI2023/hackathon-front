import { AuthLoginDto } from "@schemas/auth.schema";
import { POST } from "../route";
import { UserResponse } from "../Users/getUsers";

export const loginUser = async (userData: AuthLoginDto): Promise<LoginResponse> => {
  console.log("🚀 ~ file: login.ts:5 ~ loginUser ~ userData:", userData);
  const res = await POST("auth/login", userData);

  return res.json();
};

export interface LoginResponse {
  access_token: string;
  user: UserResponse;
}
