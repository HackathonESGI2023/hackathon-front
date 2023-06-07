import { GET } from "../route";

export async function getUsers() {
  const res = await GET(`${process.env.NEXT_PUBLIC_API_URL}/user/`);
  return res.json();
}
