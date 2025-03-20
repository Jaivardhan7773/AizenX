import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from './footer';
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Totalblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cachedBlogs = localStorage.getItem("blogs");

    if (cachedBlogs) {
      setBlogs(JSON.parse(cachedBlogs));
    } else {
      fetchAllBlogs();
    }
  }, []);
  const filteredBlogs = blogs.filter((blog) =>
    `${blog.title} ${blog.description} ${blog.tags.join(" ")} ${blog.author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("https://grillgblogs.onrender.com/allBlogs");
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error("Failed to fetch blogs!", error);
    }
  };


  return (
    <>
      <Container className="mt-4">
        <Form.Control
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Row>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Col xl={6} sm={6} md={6} key={blog._id} className="mb-4">
                <Card className="cardbg" style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  border: "1px solid rgba(255, 255, 255, 0.3)"
                }} data-aos="zoom-in-up">
                  <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ height: "200px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Text className="text-light">
                      {blog.tags.join("\u00A0~\u00A0")}
                    </Card.Text>
                    <Card.Title className="text-light">{blog.title}</Card.Title>
                    <Card.Text className="text-light">{blog.description.substring(0, 300)}...</Card.Text>
                    <Card.Text className="text-light">
                      {blog.author}<br />
                      {new Date(blog.createdAt).toISOString().split('T')[0]
                      }
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/blog/${blog._id}`)} className="w-100 gradient-btn">
                      Read Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No blogs available.</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Totalblogs