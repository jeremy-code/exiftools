import { create } from "zustand";

type DialogBlockerStore = {
  isDialogBlocked: boolean;
  setIsDialogBlocked: (isDialogBlocked: boolean) => void;
};

const useDialogBlockerStore = create<DialogBlockerStore>((set) => ({
  isDialogBlocked: false,
  setIsDialogBlocked: (isDialogBlocked) => set({ isDialogBlocked }),
}));

export { useDialogBlockerStore, type DialogBlockerStore };
