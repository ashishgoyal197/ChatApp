import Sidebar from "../../component/sidebar/Sidebar";
import MessageContainer from "../../component/messages/MessageContainer";
import "C:/Users/ashis/OneDrive/Documents/ChatApp/frontend/ChatApp/src/index.css";
export default function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
