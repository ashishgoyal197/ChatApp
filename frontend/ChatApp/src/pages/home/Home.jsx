import Sidebar from "../../component/sidebar/Sidebar";
import MessageContainer from "../../component/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";

export default function Home() {
  const { messanger } = useConversation();
  // console.log(messanger);

  let screenWidth = window.screen.width;
  let resultHome;
  if (screenWidth <= 750) {
    resultHome = (
      <div className="flex  h-[450px] md:h-[550px] rounded-lg overflow-hidden mb-5 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {!messanger ? <Sidebar /> : <MessageContainer />}
      </div>
    );
  } else {
    resultHome = (
      <div className="flex h-[450px] md:h-[550px] rounded-lg overflow-hidden mb-5 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    );
  }

  return <div>{resultHome}</div>;
}
