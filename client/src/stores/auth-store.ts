import { logout } from "@/services/auth-service";
import { getUser } from "@/services/user-service";
import { IUser } from "@/types/user-type";
import { toast } from "sonner";
import { create } from "zustand";

interface IAuthStore {
  isLoading: boolean;
  user: IUser | null;
  resetUser: (payload: IUser) => void;
  token: string | null;
  setToken: (token: string) => void;
  fetchUser: () => void;
  logout: () => void;
  clearState: () => void;
}

export const useAuthStore = create<IAuthStore>((set, _get) => ({
  isLoading: false,
  user: null,
  token: localStorage.getItem("token") ?? null,

  clearState() {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  resetUser(payload) {
    set({ user: payload });
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
    set({ token });
  },

  async fetchUser() {
    set({ isLoading: true });
    try {
      const { data } = await getUser();
      set({ user: data });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  async logout() {
    try {
      await logout();
      const tokenInlocalStorage = localStorage.getItem("token");
      if (tokenInlocalStorage) {
        localStorage.removeItem("token");
      }
      set({ user: null, token: null });
      location.reload();
    } catch (error) {
      toast.error(`${error}`);
    }
  },
}));
