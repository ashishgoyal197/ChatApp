import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileSettings({ onClose }) {
  const { authUser, setAuthUser } = useAuthContext();
  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    title: authUser?.title || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    statusMessage: authUser?.statusMessage || "",
    theme: authUser?.theme || "light",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Profile updated");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            Profile & Personalization
          </h2>
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-sm text-black">
            Full name
            <input
              name="fullname"
              className="input input-bordered w-full bg-black/5 text-black"
              value={formData.fullname}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm text-black">
            Title
            <input
              name="title"
              className="input input-bordered w-full bg-black/5 text-black"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm text-black">
            Status message
            <input
              name="statusMessage"
              className="input input-bordered w-full bg-black/5 text-black"
              value={formData.statusMessage}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm text-black">
            Location
            <input
              name="location"
              className="input input-bordered w-full bg-black/5 text-black"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm text-black">
            Bio
            <textarea
              name="bio"
              className="textarea textarea-bordered w-full bg-black/5 text-black"
              value={formData.bio}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm text-black">
            Theme
            <select
              name="theme"
              className="select select-bordered w-full bg-black/5 text-black"
              value={formData.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <button
            type="submit"
            className="btn btn-primary text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
