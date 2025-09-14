import { create } from "zustand";

type StoreType = {
  wsCurrent: null | WebSocket;
  setCurrentChat: (data: WebSocket) => void;
};

const useCurrentChat = create<StoreType>((set) => ({
  wsCurrent: null,
  setCurrentChat(data: WebSocket) {
    set({ wsCurrent: data });
  },
}));

export { useCurrentChat };
