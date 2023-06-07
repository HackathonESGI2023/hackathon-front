import { atom } from "recoil";
import { UserResponse } from "src/app/api/Users/getUsers";

const isBrowser = typeof window !== "undefined";

export const tokenAtom = atom({
  key: "tokenAtom",
  default: isBrowser ? localStorage.getItem("token") || null : null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue: string | null) => {
        if (isBrowser) {
          if (newValue) {
            localStorage.setItem("token", newValue);
          } else {
            localStorage.removeItem("token");
          }
        }
      });
    },
  ],
});

export const userAtom = atom({
  key: "userAtom",
  default: isBrowser ? JSON.parse(localStorage.getItem("user") || "{}") : {},
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue: UserResponse | null) => {
        if (isBrowser) {
          if (newValue) {
            localStorage.setItem("user", JSON.stringify(newValue));
          } else {
            localStorage.removeItem("user");
          }
        }
      });
    },
  ],
});
