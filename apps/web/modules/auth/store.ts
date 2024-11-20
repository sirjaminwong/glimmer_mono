import { create } from "zustand";
import { User } from "./model";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  user?: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<BearState>()(
  devtools((set) => ({
    setUser: (user: User) => set(() => ({ user: user })),
  })),
);
