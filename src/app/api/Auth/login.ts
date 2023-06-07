import { AuthLoginDto } from "@schemas/auth.schema";
import { POST } from "../route";

export async function loginUser(userData: AuthLoginDto) {
  console.log("🚀 ~ file: login.ts:5 ~ loginUser ~ userData:", userData);
  const res = await POST(
    "http://localhost:3000/auth/login",
    JSON.stringify(userData)
  );

  return res.json();
}

export interface LoginResponse {
  access_token: string;
}
