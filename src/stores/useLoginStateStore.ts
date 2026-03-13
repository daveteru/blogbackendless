import { create } from "zustand";

interface UserAuth {
  objectId: string;
  name: string;
  email: string;
  userToken: string;
}

interface LoginState {
  isLogin: boolean;
  user: UserAuth | null;
  login: (user: UserAuth) => void;
  logout: () => void;
}

export const useLoginStateStore = create<LoginState>((set) => ({
  isLogin: false,
  user: null,
  login: (user) => set({ isLogin: true, user }),
  logout: () => set({ isLogin: false, user: null }),
}));
