import { typeMessage } from "@/types/types";
import { create } from "zustand";

type StoreType = {
  messages: typeMessage[];
  setMessages: (newMessages: typeMessage[]) => void;
  addMessage: (msg: typeMessage) => void;
  clearMessages: () => void;
};

const useMessagesStore = create<StoreType>((set) => ({
  messages: [],

  setMessages(newMessages) {
    set({ messages: newMessages });
  },

  addMessage(msg) {
    set((state) => ({ messages: [...state.messages, msg] }));
  },

  clearMessages() {
    set({ messages: [] });
  },
}));

export { useMessagesStore };
