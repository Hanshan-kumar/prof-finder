const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/AuthModel");

const router = express.Router();
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) { 
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else { 
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const start = Date.now();
  try {
    console.log('Signup timing: started');
    const userExistsStart = Date.now();
    const userExists = await User.findOne({ email });
    const userExistsEnd = Date.now();
    console.log('Signup timing: userExists check took', userExistsEnd - userExistsStart, 'ms');
    if (userExists) {
      console.log('Signup timing: user already exists, total', Date.now() - start, 'ms');
      return res.status(400).json({ message: "User already exists" });
    }

    const userCreateStart = Date.now();
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    const userCreateEnd = Date.now();
    console.log('Signup timing: user create took', userCreateEnd - userCreateStart, 'ms');

    if (user) {
      console.log('Signup timing: success, total', Date.now() - start, 'ms');
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      console.log('Signup timing: invalid user data, total', Date.now() - start, 'ms');
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log('Signup timing: error, total', Date.now() - start, 'ms');
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;