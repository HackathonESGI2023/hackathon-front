import { EditUserType } from "src/model/user.schema";
import { PATCH } from "../route";

export async function patchUser(userData: EditUserType) {
  const res = await PATCH(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userData.id}`,
    {
      body: JSON.stringify(userData),
    }
  );

  return res.json();
}
