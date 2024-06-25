// import React from 'react'
import "C:/Users/ashis/OneDrive/Documents/ChatApp/frontend/ChatApp/src/index.css";

export default function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            alt="img"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hello World!</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:46
      </div>
    </div>
  );
}
