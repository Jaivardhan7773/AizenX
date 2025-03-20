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
        const response = await axios.get("https://grillgblogs.onrender.com/allBlogs");
        setBlogs(response.data);
      } catch (error) {
        toast.error("Failed to fetch blogs.");
        console.error("Failed to fetch blogs!", error);
      }
    };
    
    
  return (
    <>
    <div className="bg-light">
   <Container className="mt-4 pt-5">
         <Row>
         {blogs.length > 0 ? (
  blogs.slice(0, 12).map((blog) => ( 
    <Col lg={6} key={blog._id} className="mb-4">
      <Card className="cardbg"   data-aos="zoom-in-up" style={{cursor:"pointer"}}  onClick={() => navigate(`/blog/${blog._id}`)}>
        <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ maxHeight:"400px", minHeight:"400px", objectFit: "cover" }}
 />
        <Card.Body>
        <Card.Text className=""> {blog.tags.join("\u00A0·\u00A0")}<br /></Card.Text> 
          <Card.Title className="">{blog.title}</Card.Title>
          <Card.Text className="">{blog.description.substring(0, 300)}...</Card.Text>
          <Card.Text className="text-secondary fw-bold">
            {blog.author}<br/>
          </Card.Text>
          <Card.Text className="">
            {new Date(blog.createdAt).toISOString().split('T')[0]}
          </Card.Text>
          {/* <Button variant="primary" onClick={() => navigate(`/blog/${blog._id}`)} className="w-100 gradient-btn">
            Read Now
          </Button> */}
        </Card.Body>
      </Card>
    </Col>
  ))
) : (
  <p className="text-center">No blogs available.</p>
)}

         </Row>
       </Container>
       </div>
    </>
  )
}

export default Allblogs