import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
export default function Conversations() {
  const { loading, conversations } = useGetConversation();
  // console.log(conversations);

  const allConversations = conversations.map((conversation, idx) => {
    return (
      <Conversation
        key={conversation._id}
        conversation={conversation}
        lastIdx={idx === conversations.length - 1}
      />
    );
  });
  // console.log(allConversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {allConversations}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}
