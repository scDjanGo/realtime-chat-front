import { create } from "zustand";

type StoreType = {
  wsCurrent: null | WebSocket;
  setCurrentChat: (data: WebSocket) => void;
};

const useCurrentChat = create<StoreType>((set) => ({
  wsCurrent: null,
  setCurrentChat(newMessages: WebSocket) {
    set({ wsCurrent: newMessages });
  },
}));

export { useCurrentChat };
