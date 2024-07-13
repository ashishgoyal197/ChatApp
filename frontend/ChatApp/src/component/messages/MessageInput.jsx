import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    console.log(message);
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-black/5 border-blue-600 text-black"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
