import useConversation from "../../zustand/useConversation";

export default function Conversation(props) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === props.conversation._id;

  return (
    <div>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(props.conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={props.conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {props.conversation.fullname}
            </p>
            <span className="text-xl">{props.emoji}</span>
          </div>
        </div>
      </div>

      {!props.lastIdx ? <div className="divider my-0 py-0 h-1" /> : null}
    </div>
  );
}
