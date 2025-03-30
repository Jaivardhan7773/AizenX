import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Search } from "lucide-react";
AOS.init(); // Initialize animation library

const Totalblogs = () => {
  const [blogs, setBlogs] = useState([]); // Store all blogs
  const [visibleBlogs, setVisibleBlogs] = useState(10); // Number of blogs to show initially
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering blogs
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter
  const observer = useRef(); // Reference for intersection observer

  useEffect(() => {
    fetchAllBlogs(); // Fetch blogs when the component mounts
  }, []);

  // Fetch all blogs from API
  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("https://grillgblogs.onrender.com/allBlogs");
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error("Failed to fetch blogs!", error);
    }
  };

  // Filter blogs based on search term and category
  const filteredBlogs = blogs.filter((blog) =>
    (`${blog.title} ${blog.description} ${blog.tags.join(" ")} ${blog.author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "" || blog.category === selectedCategory)
  );

  // Infinite scrolling - Load more blogs when reaching the last one
  const lastBlogRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect(); // Disconnect previous observer
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleBlogs((prev) => prev + 10); // Load 10 more blogs when scrolling
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <>
      <Container className="mt-4">
        <div className="d-flex gap-3 mb-4">
          {/* Search input */}
          <div className="position-relative w-50">
            <Search className="position-absolute left-3 top-50 translate-middle-y text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 ps-5 border rounded w-100"
            />
          </div>

          {/* Category filter */}
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-25"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
          </Form.Select>
        </div>

        <Row>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
              <Col
                xl={6}
                sm={6}
                md={6}
                key={blog._id}
                className="mb-4"
                ref={index === visibleBlogs - 1 ? lastBlogRef : null} // Attach observer to last visible blog
              >
                <Card
                  className="cardbg"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                  }}
                  data-aos="zoom-in-up"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    alt={blog.title}
                    style={{ maxHeight: "400px", minHeight: "400px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    {/* Blog Tags */}
                    <Card.Text className="text-light">
                      {blog.tags.join("\u00A0~\u00A0")}
                    </Card.Text>
                    {/* Blog Title */}
                    <Card.Title className="text-light">{blog.title}</Card.Title>
                    {/* Blog Description (first 300 characters) */}
                    <Card.Text className="text-light">
                      {blog.description.substring(0, 300)}...
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <span className="text-light fw-bold">{blog.author}</span>
                      <span className="text-light">{blog.category}</span>
                    </Card.Text>
                    <Card.Text className="text-light">
                      {new Date(blog.createdAt).toISOString().split("T")[0]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-light">No blogs available.</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Totalblogs;