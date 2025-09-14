import { create } from "zustand";

type StoreType = {
  data: boolean;
  toggleBurger: () => void;
  onBurger: () => void;
  offBurger: () => void;
};

export const useOpenMainBurger = create<StoreType>((set) => ({
  data: false,
  toggleBurger: () => set((state) => ({ data: !state.data })),
  onBurger: () => set({ data: true }),
  offBurger: () => set({ data: false }),
}));


