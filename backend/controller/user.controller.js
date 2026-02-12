import User from "../model/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error in get user for sidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in get user profile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullname, title, bio, location, statusMessage, theme } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        title,
        bio,
        location,
        statusMessage,
        theme,
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update user profile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
