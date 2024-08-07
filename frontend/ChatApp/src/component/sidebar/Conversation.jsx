import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

export default function Conversation(props) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { setMessenger } = useConversation();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(props.conversation._id);

  const one = () => {
    setSelectedConversation(props.conversation);
    if (selectedConversation !== null) two();
  };
  const two = () => {
    setMessenger(true);
  };
  const handleclick = () => {
    one();
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer`}
        onClick={handleclick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={props.conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black">
              {props.conversation.fullname}
            </p>
          </div>
        </div>
      </div>

      {!props.lastIdx ? <div className="divider my-0 py-0 h-1" /> : null}
    </div>
  );
}
