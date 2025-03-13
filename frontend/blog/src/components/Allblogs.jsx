import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();



const Allblogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //   AOS.init({ duration: 1000, once: true });
    // }, []);
    
    useEffect(() => {
      fetchAllBlogs();
    }, []);
  
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allBlogs");
        setBlogs(response.data);
      } catch (error) {
        toast.error("Failed to fetch blogs.");
        console.error("Failed to fetch blogs!", error);
      }
    };
    
    
  return (
    <>
   <Container className="mt-4">
         <Row>
         {blogs.length > 0 ? (
  blogs.slice(0, 12).map((blog) => ( 
    <Col xl={3} sm={6} md={4} key={blog._id} className="mb-4">
      <Card className="cardbg" style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.3)"
      }}  data-aos="zoom-in-up">
        <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ height: "200px", objectFit: "cover" }}
          onMouseEnter={(e) => (e.target.style.opacity = 1)}
  onMouseLeave={(e) => (e.target.style.opacity = 0.7)} />
        <Card.Body>
          <Card.Title className="text-light">{blog.title}</Card.Title>
          <Card.Text className="text-light">{blog.description.substring(0, 100)}...</Card.Text>
          <Card.Text className="text-light">
            <strong>Author</strong> {blog.tags.join(", ")}<br />
            <strong>Date</strong> {blog.createdAt}
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
       
    </>
  )
}

export default Allblogs