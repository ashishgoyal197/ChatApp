import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { replyToMessage, setReplyToMessage, selectedConversation } =
    useConversation();
  const { socket } = useSocketContext();
  const typingTimeout = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message, replyToMessage?._id);
    setMessage("");
    setReplyToMessage(null);
  };

  useEffect(() => {
    if (!socket || !selectedConversation?._id) return;
    if (!message.trim()) {
      socket.emit("stopTyping", { receiverId: selectedConversation._id });
      return;
    }
    socket.emit("typing", { receiverId: selectedConversation._id });
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { receiverId: selectedConversation._id });
    }, 900);

    return () => {
      if (message.trim()) {
        socket.emit("stopTyping", { receiverId: selectedConversation._id });
      }
      clearTimeout(typingTimeout.current);
    };
  }, [message, selectedConversation?._id, socket]);

  const handleCancelReply = () => setReplyToMessage(null);
  return (
    <div>
      {replyToMessage && (
        <div className="mx-4 mt-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700 flex items-center justify-between">
          <span className="truncate">
            Replying to:{" "}
            {replyToMessage.isDeleted
              ? "Message deleted"
              : replyToMessage.message}
          </span>
          <button
            type="button"
            className="text-blue-500"
            onClick={handleCancelReply}
          >
            Close
          </button>
        </div>
      )}
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-black/5 border-blue-600 text-black"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
