import { create } from "zustand";
import { typeNotification } from "@/types/types";
type StoreType = {
  notification: { [uuid: string]: { isHave: boolean } };
  addNotification: (notification: typeNotification) => void;
  removeNotification: (notification: typeNotification) => void;
};

const useNotificationsStore = create<StoreType>((set) => ({
  notification: {},
  addNotification(notification) {
    const uuid: string | undefined = Object.keys(notification)[0];
    if (!uuid) return;

    set((state) => ({
      notification: {
        ...state.notification,
        [uuid]: { isHave: true },
      },
    }));
  },
  removeNotification(notification) {
    const uuid: string | undefined = Object.keys(notification)[0];
    if (!uuid) return;

    set((state) => ({
      notification: {
        ...state.notification,
        [uuid]: { isHave: true },
      },
    }));
  },
}));

export { useNotificationsStore };
