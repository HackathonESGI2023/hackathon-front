import { AuthRegisterDto } from "@zod/auth/auth.schema";
import { POST } from "../route";

export async function registerUser(userData: AuthRegisterDto) {
  const res = await POST("auth/register", {
    body: userData,
  });

  return res.json();
}
