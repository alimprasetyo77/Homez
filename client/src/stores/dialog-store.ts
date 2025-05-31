import { create } from "zustand";

type dialogType = "signIn" | "signUp";
// store/dialogStore.ts
interface DialogStore {
  activeDialog: dialogType | null;
  openDialog: (key: dialogType) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  activeDialog: null,
  openDialog: (key: dialogType) => set({ activeDialog: key }),
  closeDialog: () => set({ activeDialog: null }),
}));
