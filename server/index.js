const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();
const auth = require("./routes/auth");
const login = require("./routes/login");
const getUserroutes = require("./routes/userData");
const blogRoutes = require("./routes/blogRoutes");
const carouselRoute = require("./routes/carousel")
const queryRoute = require('./routes/query');
const Request = require('./routes/requests');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const allowedOrigins = [
  "https://aizenx.netlify.app", 
  "http://localhost:3000",      
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", auth);
app.use("/", login);
app.use("/" , getUserroutes);
app.use("/" , blogRoutes);
app.use("/" , carouselRoute );
app.use("/" , queryRoute);
app.use("/" , Request);


app.get("/", (req, res) => {
  res.json({ message: "For uptime robot " });
});




mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
