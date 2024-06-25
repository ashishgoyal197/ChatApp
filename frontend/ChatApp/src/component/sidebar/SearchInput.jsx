import { IoSearchSharp } from "react-icons/io5";
export default function SearchInput() {
  return (
    <div>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
}
