const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 8;
const upload = require("../multerConfig");
const OTP = require('../models/otpSchema');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();





const generaterandom = () => {
  return crypto.randomInt(1000, 10000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});




router.post('/send-otp', async (req, res) => {
  try {

    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "email is required" });
      return
    }

    // const existingOtp = await OTP.findOne({ email });



    // if (existingOtp && existingOtp.expiresAt > Date.now() - 60 * 1000) {
    //     return res.status(429).json({ message: "OTP already sent. Please wait 1 minute before requesting again." });
    // }
    //   if (existingOtp.lockUntil && existingOtp.lockUntil > Date.now()) {
    //     return res.status(429).json({ message: "Too many  attempts. Try again after 24 hours." });
    // }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email or number already registered." });
    }

    let otp = generaterandom()
    console.log(`Sending OTP to: ${email}`);
    console.log(`Generated OTP: ${otp}`);
    const mailOptions = {
      from: `"AizenX Blogs" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "🔐 Your AizenX OTP Code - Secure Your Account",
      html: `
             <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 450px; margin: auto;">
    <h2 style="color: #007bff; text-align: center;">AizenX Verification Code</h2>
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">
      Your one-time password (OTP) for AizenX registration/login is:
    </p>
    <div style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px; background: #f3f3f3; border-radius: 5px; margin: 10px 0;">
      ${otp}
    </div>
    <p style="font-size: 16px;">
      This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone for security reasons.
    </p>
    <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
    <div style="text-align: center; margin-top: 15px;">
      <a href="https://www.instagram.com/jaivardhan7773_/#"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" style="margin: 0 5px; height: 25px; width: 25px;" /></a>
      <a  href="https://www.instagram.com/jaivardhan7773_/#"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="Instagram" style="margin: 0 5px; height: 25px; width: 25px;" /></a>
      <a  href="https://x.com/Jay_Vardhan7773"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="X" style="margin: 0 5px; height: 30px; width: 30px;" /></a>
      <a href="https://www.linkedin.com/in/jaivardhan-singh-rathore-9a0149334" target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="LinkedIn" style="margin: 0 5px; height: 30px; width: 30px;" /></a>
    </div>
    <p style="text-align: center; font-size: 14px; color: #555; margin-top: 10px;">© 2025 AizenX Blogs. All rights reserved.</p>
  </div>
        `,
    };
    let otpp = await OTP.findOneAndUpdate({ email }, { email, otp, expiresAt: Date.now() + 10 * 60 * 1000 }, { upsert: true, new: true });
    console.log(otpp);
    // otpp.save()
    await transporter.sendMail(mailOptions);
    res.send({ message: "otp sent successfully" });

  }
  catch (error) {
    return res.status(500).send({ message: "sever crashed", error })
  }


}) ;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, gender, otp } = req.body;
    const MAX_FAILED_ATTEMPTS = 5;
    const LOCK_TIME = 24 * 60 * 60 * 1000;

    if (!name || !email || !password || !phone || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (name.length < 6 || name.length > 10) {
      return res.status(400).json({ message: "Name must be between 6 and 10 characters long." });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or number already registered." });
    }

    let otpobj = await OTP.findOne({ email });

    if (!otpobj) {
      return res.status(400).json({ message: "OTP not found. Request a new one." });
    }

    if (otpobj.lockUntil && otpobj.lockUntil > Date.now()) {
      return res.status(429).json({ message: "Too many failed attempts. Try again after 24 hours." });
    }

    if (otpobj.otp !== otp) {
      otpobj.failedAttempts += 1;


      if (otpobj.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        otpobj.lockUntil = new Date(Date.now() + LOCK_TIME);
      }

      await otpobj.save();

      return res.status(400).json({ message: "Incorrect OTP. Try again." });
    }
    await OTP.findOneAndDelete({ email });
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
