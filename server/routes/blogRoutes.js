const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.post("/addBlog", async (req, res) => {
    try {
        let { userId, title, image, description, tags } = req.body;

        if (!userId || !title || !image || !description || !tags.length) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate word count instead of character count
        if (description.split(" ").length < 300) {
            return res.status(400).json({ message: "Description must be at least 300 words." });
        }

        // Ensure tags are an array
        tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

        const newBlog = new Blog({ userId, title, image, description, tags });
        await newBlog.save();
        res.status(201).json({ message: "Blog posted successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/userBlogs/:userId", async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/allBlogs", async (req, res) => {
    try {
      const blogs = await Blog.find({});
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs" });
    }
  });

  router.get("/blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/updateBlog/:blogId", async (req, res) => {
    try {
      const { title, image, description, tags } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        { title, image, description, tags },
        { new: true }
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog", error });
    }
  });
  

  router.delete("/deleteBlog/:blogId", async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
  
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({ message: "Blog deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog", error });
    }
  });

module.exports = router;
