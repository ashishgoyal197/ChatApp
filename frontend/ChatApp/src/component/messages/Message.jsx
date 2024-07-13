// import React from 'react'

import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

export default function Message(props) {
  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();
  const fromMe = props.message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-black/10";
  const textColor = fromMe ? "text-white" : "text-black";
  const shakeClass = props.message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="img" />
        </div>
      </div>
      <div
        className={`chat-bubble ${textColor} ${bubbleBgColor} ${shakeClass} pb-2 break-words max-w-56`}
      >
        {props.message.message}
      </div>
      <div className="chat-footer text-xs flex gap-1 items-center">
        {extractTime(props.message.createdAt)}
      </div>
    </div>
  );
}
