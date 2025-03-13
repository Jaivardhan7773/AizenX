const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const adminMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from headers
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    // 3️⃣ Check if user exists and is admin
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next(); // ✅ Pass control to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
