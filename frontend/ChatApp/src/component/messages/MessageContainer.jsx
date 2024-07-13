import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";

Messages;
export default function MessageContainer() {
  const { selectedConversation } = useConversation();
  const { setMessenger } = useConversation();

  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  const handleclick = () => {
    setMessenger(false);
  };

  const screenWidth = window.screen.width;

  return (
    <div className="min-w-[350px] bg-white md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-blue-500 px-4 py-2 mb-2 flex items-center">
            {screenWidth <= "750" ? (
              <button className="px-0 text-black" onClick={handleclick}>
                <FaArrowLeft />
              </button>
            ) : (
              ""
            )}

            <span className="text-black font-bold flex-grow text-center">
              {selectedConversation.fullname}
            </span>
          </div>

          <Messages />
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
