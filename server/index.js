const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();
const Blog = require("./models/blog");
const auth = require("./routes/auth");
const login = require("./routes/login");
const getUserroutes = require("./routes/userData");
const blogRoutes = require("./routes/blogRoutes");
const carouselRoute = require("./routes/carousel")
const queryRoute = require('./routes/query');
const Request = require('./routes/requests');
const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const allowedOrigins = [
  "https://grillg.netlify.app", 
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


app.get("/sitemap.xml", async (req, res) => {
  try {
    const hostname = "https://grillg.netlify.app";
    const blogs = await Blog.find({}, "slug updatedAt"); // Fetch all blog slugs

    const sitemap = new SitemapStream({ hostname });

    // Add homepage
    sitemap.write({ url: "/", changefreq: "weekly", priority: 1.0 });

    // Add blog posts dynamically
    blogs.forEach((blog) => {
      sitemap.write({
        url: `/blog/${blog.slug}`,
        lastmod: blog.updatedAt.toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    sitemap.end();
    const sitemapBuffer = await streamToPromise(sitemap);

    res.header("Content-Type", "application/xml");
    res.send(sitemapBuffer.toString());
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});



mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
