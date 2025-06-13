const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const adminMiddleware = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
