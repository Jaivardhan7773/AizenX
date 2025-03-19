const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const userAuthMiddleware = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access Denied: You can only edit your own profile" });
    }

    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuthMiddleware;