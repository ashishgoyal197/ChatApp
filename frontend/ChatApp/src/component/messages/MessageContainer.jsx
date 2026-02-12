import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { formatLastSeen } from "../../utils/extractTime";

Messages;
export default function MessageContainer() {
  const { selectedConversation } = useConversation();
  const { setMessenger } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const trimmedQuery = searchQuery.trim();

  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  const handleclick = () => {
    setMessenger(false);
  };

  const screenWidth = window.screen.width;

  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [selectedConversation?._id]);

  useEffect(() => {
    if (!selectedConversation?._id) return;
    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `/api/message/search/${selectedConversation._id}?query=${encodeURIComponent(
            trimmedQuery
          )}`
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setSearchResults(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [trimmedQuery, selectedConversation?._id]);

  const isOnline = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  return (
    <div className="min-w-[350px] bg-white md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-blue-500 px-4 py-2 mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {screenWidth <= "750" ? (
                <button className="px-0 text-black" onClick={handleclick}>
                  <FaArrowLeft />
                </button>
              ) : (
                ""
              )}

              <div className="flex flex-col flex-1">
                <span className="text-black font-bold">
                  {selectedConversation.fullname}
                </span>
                <span className="text-xs text-black/70">
                  {isOnline
                    ? "Online"
                    : formatLastSeen(selectedConversation.lastSeen)}
                </span>
              </div>
            </div>
            {screenWidth <= "750" ? (
              ""
            ) : null}
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="input input-bordered input-sm w-full bg-white/70 text-black"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchLoading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </div>
          </div>

          <Messages searchQuery={trimmedQuery} searchResults={searchResults} />
          <MessageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-blue-700">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
