import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

export default function useTypingIndicator() {
  const { socket } = useSocketContext();
  const { setTypingUser } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({ senderId }) => {
      setTypingUser(senderId, true);
    };

    const handleStopTyping = ({ senderId }) => {
      setTypingUser(senderId, false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket, setTypingUser]);
}
