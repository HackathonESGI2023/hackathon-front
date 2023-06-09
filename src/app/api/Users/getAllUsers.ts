import { GET } from "../route";
import { UserResponse } from "./getUsers";

/**
 * @returns UserResponse[]
 */

export const getAllUsers = async (): Promise<Array<UserResponse>> => {
  const res = await GET("users/all");

  return res.json();
};
