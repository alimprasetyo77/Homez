import { logout } from "@/services/auth/api";
import { getUser } from "@/services/user/api";
import { IUser } from "@/services/user/types";
import { toast } from "sonner";
import { create } from "zustand";

interface IAuthStore {
  isLogin: boolean;
  user: IUser | null;
  token: string | null;
  setToken: (token: string) => void;
  fetchUser: () => void;
  logout: () => void;
  clearState: () => void;
}

export const useAuthStore = create<IAuthStore>((set, _get) => ({
  isLogin: false,
  user: null,
  token: null,

  setToken(token: string | null) {
    set({ token, isLogin: true });
  },
  clearState() {
    set({ isLogin: false, user: null, token: null });
  },
  async fetchUser() {
    try {
      const { data } = await getUser();
      set({ user: data });
    } catch (error) {
      toast.error(`${error}`);
    }
  },
  async logout() {
    try {
      const { message } = await logout();
      set({ token: null, user: null, isLogin: false });
      toast.success(`${message}`);
    } catch (error) {
      toast.error(`${error}`);
    }
  },
}));
