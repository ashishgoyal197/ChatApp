import { create } from "zustand";

const useConversation = create((set) => ({
  messenger: false,
  setMessenger: (messenger) => set((state) => ({ ...state, messenger })),
  selectedConversation: undefined,
  setSelectedConversation: (selectedConversation) =>
    set((state) => ({ ...state, selectedConversation })),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
}));

export default useConversation;
