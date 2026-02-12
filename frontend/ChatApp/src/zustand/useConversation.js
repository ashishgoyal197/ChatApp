import { create } from "zustand";

const useConversation = create((set) => ({
  messenger: false,
  setMessenger: (messenger) => set((state) => ({ ...state, messenger })),
  selectedConversation: undefined,
  setSelectedConversation: (selectedConversation) =>
    set((state) => ({ ...state, selectedConversation })),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
  updateMessage: (updatedMessage) =>
    set((state) => ({
      ...state,
      messages: state.messages.map((message) =>
        message._id === updatedMessage._id
          ? { ...message, ...updatedMessage }
          : message
      ),
    })),
  replyToMessage: null,
  setReplyToMessage: (replyToMessage) =>
    set((state) => ({ ...state, replyToMessage })),
  typingUsers: {},
  setTypingUser: (userId, isTyping) =>
    set((state) => ({
      ...state,
      typingUsers: { ...state.typingUsers, [userId]: isTyping },
    })),
}));

export default useConversation;
