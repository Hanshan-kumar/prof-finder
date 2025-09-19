const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
});

router.put("/:email", async (req, res) => {
    const { email } = req.params;
    const updatedDetails = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email }, 
        updatedDetails, 
        { new: true, upsert: true, runValidators: true } 
      );
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error saving user details", error: error.message });
    }
  });
module.exports = router;