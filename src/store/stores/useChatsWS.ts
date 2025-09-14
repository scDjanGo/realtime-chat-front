import { create } from "zustand";

type StoreType = {
  wsData: null | WebSocket;
  setChatsData: (data: WebSocket) => void;
};

const useChatsWS = create<StoreType>((set) => ({
  wsData: null,
  setChatsData(data: WebSocket) {
    set({ wsData: data });
  },
}));

export { useChatsWS };
