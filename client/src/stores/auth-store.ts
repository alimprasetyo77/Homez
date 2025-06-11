import { logout } from "@/services/auth-service";
import { getUser } from "@/services/user-service";
import { IUser } from "@/types/user-type";
import { toast } from "sonner";
import { create } from "zustand";

interface IAuthStore {
  isLogin: boolean;
  isLoading: boolean;
  user: IUser | null;
  resetUser: (payload: IUser) => void;
  token: string | null;
  setToken: (token: string) => void;
  fetchUser: () => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set, _get) => ({
  isLogin: false,
  isLoading: false,
  user: null,
  token: sessionStorage.getItem("token") ?? null,

  resetUser(payload) {
    set({ user: payload });
  },

  setToken(token: string) {
    sessionStorage.setItem("token", token);
    set({ token, isLogin: true });
  },

  async fetchUser() {
    set({ isLoading: true });
    try {
      const { data } = await getUser();
      set({ user: data, isLogin: true });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  async logout() {
    try {
      const { message } = await logout();
      const tokenInSessionStorage = sessionStorage.getItem("token");
      if (tokenInSessionStorage) {
        sessionStorage.removeItem("token");
      }
      set({ isLogin: false, user: null, token: null });
      toast.success(`${message}`);
    } catch (error) {
      toast.error(`${error}`);
    }
  },
}));
