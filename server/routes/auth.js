const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 8;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

 
    if (!name || !email || !password || !phone || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }


    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
     });
    if (existingUser) {
      return res.status(400).json({ message: "Email or number already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      phone,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
