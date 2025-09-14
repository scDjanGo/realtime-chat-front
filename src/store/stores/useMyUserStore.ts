import { typeUser } from "@/types/types";
import { create } from "zustand";

type StoreType = {
  myUser: typeUser | null;
  setMyUser: (data: typeUser | null) => void;
};

const useMyUserStore = create<StoreType>((set) => ({
  myUser: null,
  setMyUser(data) {
    set({ myUser: data});
  },
}));






export {useMyUserStore}