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
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const os = require("os");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", auth);
app.use("/", login);
app.use("/" , getUserroutes);
app.use("/" , blogRoutes);
app.use("/" , carouselRoute );
app.use("/" , queryRoute);
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  