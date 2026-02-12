import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useTypingIndicator from "../../hooks/useTypingIndicator";
import useConversation from "../../zustand/useConversation";

export default function Messages({ searchQuery, searchResults }) {
  const { messages, loading } = useGetMessages();
  const { selectedConversation, typingUsers } = useConversation();
  useListenMessages();
  useTypingIndicator();
  const lastMessageRef = useRef();
  const activeMessages = searchQuery ? searchResults : messages;
  const pinnedMessages = messages.filter((message) => message.pinned);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  }, [activeMessages]);

  // console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && pinnedMessages.length > 0 && !searchQuery && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-2">
          <p className="text-xs font-semibold text-blue-600 mb-2">
            Pinned Messages
          </p>
          <div className="flex flex-col gap-2">
            {pinnedMessages.map((message) => (
              <div key={message._id} className="text-xs text-blue-800">
                {message.isDeleted ? "Message deleted" : message.message}
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading &&
        activeMessages.length > 0 &&
        activeMessages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && activeMessages.length === 0 && !searchQuery && (
        <p className="text-center">Send a message to start a conversation</p>
      )}
      {!loading && activeMessages.length === 0 && searchQuery && (
        <p className="text-center">
          No messages match &quot;{searchQuery}&quot;
        </p>
      )}
      {selectedConversation &&
        typingUsers[selectedConversation._id] &&
        !searchQuery && (
          <p className="text-xs text-slate-500 mt-2">
            {selectedConversation.fullname} is typing...
          </p>
        )}
    </div>
  );
}
