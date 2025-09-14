import { typeUser } from "@/types/types";
import { create } from "zustand";

type StoreType = {
  activeUsers: typeUser[];
  setActiveUsers: (newActiveUsers: typeUser[]) => void;
  addActiveUsers: (user: typeUser[]) => void;
};

const useActiveUsersStore = create<StoreType>((set) => ({
  activeUsers: [],
  setActiveUsers(newActiveUsers) {
    set({ activeUsers: newActiveUsers });
  },
  addActiveUsers(user) {
    set((state) => ({ activeUsers: [...state.activeUsers, ...user] }));
  },
}));

export { useActiveUsersStore };
