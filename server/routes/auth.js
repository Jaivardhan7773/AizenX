const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 8;
const upload = require("../multerConfig");
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




router.post("/upload/profile/:id", upload.single("profile"), async (req, res) => {
  try {
      const userId = req.params.id; 

      if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found in DB" });
      }

      const imageUrl = req.file.path; // Cloudinary URL

      user.profileImage = imageUrl;
      await user.save();

      res.status(200).json({ message: "Profile image updated successfully", imageUrl });
  } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ message: "Error uploading profile image", error: error.message });
  }
});







router.put("/remove-profile-image/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileImage = ""; // ✅ Remove profile image
    await user.save();

    res.status(200).json({ message: "Profile image removed successfully" });
  } catch (error) {
    console.error("Remove Image Error:", error);
    res.status(500).json({ message: "Error removing profile image", error: error.message });
  }
});


module.exports = router;
