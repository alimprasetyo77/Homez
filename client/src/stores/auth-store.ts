import { logout } from "@/services/auth-service";
import { getUser } from "@/services/user-service";
import { IProperty } from "@/types/property-type";
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
  properties: IProperty[];
  havePendingProperty: boolean;
}

export const useAuthStore = create<IAuthStore>((set, _get) => ({
  isLoading: false,
  user: null,
  token: sessionStorage.getItem("token") ?? null,
  properties: [],
  havePendingProperty: false,

  clearState() {
    sessionStorage.removeItem("token");
    set({ user: null, token: null });
  },

  resetUser(payload) {
    set({ user: payload });
  },

  setToken(token: string) {
    sessionStorage.setItem("token", token);
    set({ token });
  },

  async fetchUser() {
    set({ isLoading: true });
    try {
      const { data } = await getUser();
      set({
        user: data,
        properties: data.properties,
        havePendingProperty: data.properties.some((value) => value.status === "pending"),
      });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  async logout() {
    try {
      await logout();
      const tokenInSessionStorage = sessionStorage.getItem("token");
      if (tokenInSessionStorage) {
        sessionStorage.removeItem("token");
      }
      set({ user: null, token: null });
    } catch (error) {
      toast.error(`${error}`);
    }
  },
}));
