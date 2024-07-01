import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
export default function Sidebar() {
  return (
    <div className="border-r min-w-[350px] border-slate-500 p-4 flex flex-col ">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}
