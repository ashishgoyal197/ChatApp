import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, setMessages]);
}
