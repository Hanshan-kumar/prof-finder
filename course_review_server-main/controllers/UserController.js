const User = require("../models/UserModel");
const getUserDetails = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
      runValidators: true, 
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { getUserDetails, updateUserDetails };