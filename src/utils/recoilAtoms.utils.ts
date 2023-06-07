import { atom } from "recoil";

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
