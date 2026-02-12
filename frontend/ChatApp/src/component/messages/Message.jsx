import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { FaRegEdit, FaRegSmile, FaReply } from "react-icons/fa";
import { MdDeleteOutline, MdPushPin } from "react-icons/md";

export default function Message(props) {
  const { authUser } = useAuthContext();
  const { selectedConversation, updateMessage, setReplyToMessage } =
    useConversation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.message.message);
  const senderId = props.message.senderId?.toString();
  const authUserId = authUser?._id?.toString();
  const fromMe = senderId && authUserId ? senderId === authUserId : false;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-black/10";
  const textColor = fromMe ? "text-white" : "text-black";
  const shakeClass = props.message.shouldShake ? "shake" : "";
  const isRead =
    fromMe &&
    props.message.readBy?.some(
      (reader) =>
        reader?.toString() === selectedConversation?._id ||
        reader?._id?.toString() === selectedConversation?._id
    );

  const reactionSummary = useMemo(() => {
    return (props.message.reactions || []).reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});
  }, [props.message.reactions]);

  useEffect(() => {
    setEditedText(props.message.message);
  }, [props.message.message]);

  const handleEditSave = async () => {
    if (!editedText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      const res = await fetch(`/api/message/edit/${props.message._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editedText }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      updateMessage(data);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/message/${props.message._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      updateMessage(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReaction = async (emoji) => {
    try {
      const res = await fetch(`/api/message/react/${props.message._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      updateMessage(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePin = async () => {
    try {
      const res = await fetch(`/api/message/pin/${props.message._id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      updateMessage(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="img" />
        </div>
      </div>
      <div className="flex flex-col gap-1 max-w-56">
        <div
          className={`chat-bubble ${textColor} ${bubbleBgColor} ${shakeClass} pb-2 break-words`}
        >
          {props.message.replyTo && (
            <div className="text-[10px] mb-1 opacity-80">
              Replying to{" "}
              {props.message.replyTo.senderId?.toString() === authUser._id
                ? "you"
                : selectedConversation?.fullname}
              :{" "}
              {props.message.replyTo.isDeleted
                ? "Message deleted"
                : props.message.replyTo.message}
            </div>
          )}
          {props.message.isDeleted ? (
            <span className="italic">Message deleted</span>
          ) : isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="input input-xs bg-white/80 text-black"
                value={editedText}
                onChange={(event) => setEditedText(event.target.value)}
              />
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  className="text-white/90"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-white/70"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            props.message.message
          )}
        </div>
        <div className="chat-footer text-xs flex gap-2 items-center">
          {extractTime(props.message.createdAt)}
          {props.message.editedAt && !props.message.isDeleted && (
            <span>(edited)</span>
          )}
          {props.message.pinned && !props.message.isDeleted && (
            <span className="text-blue-500">Pinned</span>
          )}
          {isRead && <span className="text-blue-500">Seen</span>}
        </div>
        {Object.keys(reactionSummary).length > 0 && (
          <div className="flex gap-2 text-xs">
            {Object.entries(reactionSummary).map(([emoji, count]) => (
              <span key={emoji}>
                {emoji} {count}
              </span>
            ))}
          </div>
        )}
        {!props.message.isDeleted && (
          <div
            className={`flex gap-3 text-xs ${
              fromMe ? "justify-end" : "justify-start"
            }`}
          >
            <button
              type="button"
              className="text-slate-500"
              onClick={() => setReplyToMessage(props.message)}
            >
              <FaReply />
            </button>
            <button
              type="button"
              className="text-slate-500"
              onClick={() => handleReaction("👍")}
            >
              <FaRegSmile />
            </button>
            <button
              type="button"
              className="text-slate-500"
              onClick={() => handleReaction("❤️")}
            >
              ❤️
            </button>
            <button
              type="button"
              className="text-slate-500"
              onClick={() => handleReaction("😂")}
            >
              😂
            </button>
            <button
              type="button"
              className="text-slate-500"
              onClick={handlePin}
            >
              <MdPushPin />
            </button>
            {fromMe && (
              <>
                <button
                  type="button"
                  className="text-slate-500"
                  onClick={() => setIsEditing(true)}
                >
                  <FaRegEdit />
                </button>
                <button
                  type="button"
                  className="text-slate-500"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
