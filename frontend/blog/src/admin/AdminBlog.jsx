import React, { useEffect, useState } from "react";
import {  Button, Container } from "react-bootstrap";
import {  Card, Row, Col,  } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllBlogs();
      }, []);
    
      const fetchAllBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:5000/allBlogs");
          setBlogs(response.data);
        } catch (error) {
          toast.error("Failed to fetch blogs.");
        }
      };


    const handleDeleteblog = async (blogId) => {
      const token = localStorage.getItem("Token");
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
      
        try {
          await axios.delete(`http://localhost:5000/deleteBlog/${blogId}` , {
            headers : {Authorization: `Bearer ${token}`},
          });
          toast.success("Blog deleted successfully!");
          fetchAllBlogs(); 
        } catch (error) {
          toast.error("Failed to delete blog.");
        }
      };
      
  return (
   <>
           <Container className="mt-4">
      <h2 className="text-center mb-4">All Blogs</h2>
      <Row>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col md={4} key={blog._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                <Card.Text>
                 {blog.tags.join("\u00A0·\u00A0")}
                  </Card.Text>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description.substring(0, 100)}...</Card.Text>
                  <Card.Text>
                 {blog.author}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/blog/${blog._id}`)}  className="w-100">
                    Read Now
                  </Button>
                <Button variant="danger" onClick={() => handleDeleteblog(blog._id)} className="w-100 my-1">Delete</Button>
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

export default AdminBlog