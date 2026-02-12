import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { setMessages, updateMessage } = useConversation();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageUpdated", updateMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageUpdated", updateMessage);
    };
  }, [socket, setMessages, updateMessage]);
}
