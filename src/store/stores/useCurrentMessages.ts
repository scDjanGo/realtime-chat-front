import { typeMessage } from "@/types/types";
import { create } from "zustand";

type StoreType = {
  messages: typeMessage[];
  setMessagesC: (newMessages: typeMessage[]) => void;
  addMessageC: (msg: typeMessage) => void;
  clearMessagesC: () => void;
};

const useCurrentMessages = create<StoreType>((set) => ({
  messages: [],

  setMessagesC(newMessages) {
    set({ messages: newMessages });
  },

  addMessageC(msg) {
    set((state) => ({ messages: [...state.messages, msg] }));
  },

  clearMessagesC() {
    set({ messages: [] });
  },
}));

export { useCurrentMessages };
