import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import ProfileSettings from "./ProfileSettings";
import { useAuthContext } from "../../context/AuthContext";
export default function Sidebar() {
  const [showProfile, setShowProfile] = useState(false);
  const { authUser } = useAuthContext();
  return (
    <div className="border-r min-w-[350px] border-slate-500 p-4 flex flex-col bg-white">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-black">
            {authUser?.fullname}
          </p>
          <p className="text-xs text-slate-500">
            {authUser?.statusMessage || "Set a status message"}
          </p>
        </div>
        <button
          className="btn btn-xs btn-outline text-blue-600"
          onClick={() => setShowProfile(true)}
        >
          Profile
        </button>
      </div>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
      {showProfile && (
        <ProfileSettings onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}
