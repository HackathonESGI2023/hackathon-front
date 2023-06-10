import { DELETE } from "../route";
import { UserResponse } from "./getUsers";

/**
 * DELETE /users/:id
 * @param id: number
 * @returns UserResponse
 */

export const deleteUser = async (
  id: UserResponse["id"]
): Promise<UserResponse> => {
  const res = await DELETE(`users/${id}`);

  return res.json();
};
