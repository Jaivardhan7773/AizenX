import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Footer from './footer';
const Myblogs = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
    author:"",
  });

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  const userId = user?._id;

  useEffect(() => {
    const cachedBlogs = JSON.parse(localStorage.getItem(`userBlogs_${userId}`));
  
    if (cachedBlogs) {
      setBlogs(cachedBlogs);
    } else {
      fetchBlogs();
    }
  }, []); 

  const fetchBlogs = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.get(`http://localhost:5000/userBlogs/${userId}`, {
        headers : {Authorization: `Bearer ${token}`},
      });
      setBlogs(response.data);
    } catch (error) {
      toast.error("Login first");
    }
  };

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("Token");
    e.preventDefault();
    if (blogData.description.split(" ").length < 300) {
      return toast.error("Description must be at least 300 words.");
    }

    try {
      await axios.post("http://localhost:5000/addBlog", 
        { ...blogData, userId, tags: blogData.tags.split(",") }, {
          headers : {Authorization: `Bearer ${token}`},
        } );
      toast.success("Blog posted successfully!");
      setBlogData({ title: "", image: "", description: "", tags: ""  , author:""});
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to post blog.");
    }
  };

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("Token");
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/deleteBlog/${blogId}`, {
        headers : {Authorization: `Bearer ${token}`},
      });
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("Token");
    if (!selectedBlog) return;

    if (selectedBlog.description.split(" ").length < 300) {
      return toast.error("Description must be at least 300 words.");
    }

    try {
      await axios.put(`http://localhost:5000/updateBlog/${selectedBlog._id}`,
         selectedBlog 
         , {headers : {Authorization: `Bearer ${token}`},
        });
      toast.success("Blog updated successfully!");
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to update blog.");
    }
  };

  return (
    <>
    <Container className="mt-4">
    <h2 className="text-center mb-4 text-light">Create a New Blog</h2>
      <Form onSubmit={handleSubmit} className="pb-5">
        <Form.Group className="mb-3">
          <Form.Label className=" text-light">Title</Form.Label>
          <Form.Control type="text" name="title" value={blogData.title}  className="text-light bg-dark" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className=" text-light">Image URL</Form.Label>
          <Form.Control type="text" name="image" value={blogData.image}  className="text-light bg-dark" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className=" text-light">Description (Minimum 300 words)</Form.Label>
          <Form.Control as="textarea" rows={5} name="description" className="text-light bg-dark"  value={blogData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className=" text-light">Tags (hastags)</Form.Label>
          <Form.Control type="text" name="tags"  className="text-light bg-dark" value={blogData.tags} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className=" text-light">Author Name</Form.Label>
          <Form.Control type="text" name="author"  className="text-light bg-dark" value={blogData.author} onChange={handleChange} required />
        </Form.Group>

        <Button variant="success" type="submit" className=" text-light w-50 mb-5">Post Blog</Button>
      </Form>

      <h2 className="text-center mt-5 text-light">Your Blogs</h2>
      {blogs.length > 0 ? (
        <Row className="mt-3">
          {blogs.map((blog) => (
            <Col md={4} sm={6} xs={12} key={blog._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <Card.Body>
                <Card.Text className="text-secondary" style={{ fontFamily: "Helvetica, Arial, sans-serif", letterSpacing: "0.5px" ,textTransform: "uppercase"}}>
                    {blog.tags.join("\u00A0·\u00A0")}
                  
                  </Card.Text>
                  <Card.Title className="text-truncate" style={{fontFamily: "'Montserrat', sans-serif"}}>{blog.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {blog.description.substring(0, 100)}...
                  </Card.Text>
         <Card.Text className="">
            {blog.author} <br/>
            {new Date(blog.createdAt).toISOString().split('T')[0]} &nbsp; 
          </Card.Text>
                  <Button variant="primary" className="me-2 w-100" onClick={() => navigate(`/blog/${blog._id}`)}>Read More</Button>
                  <Button variant="warning" className="me-2 my-1 w-100" onClick={() => { setSelectedBlog(blog); setShowModal(true); }}>Update</Button>
                  <Button variant="danger" className="me-2 w-100" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
              
        </Row>

        
      ) : (
        <p className="text-center mt-3 text-light">No blogs posted yet.</p>
      )}

    
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedBlog.title} 
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedBlog.image} 
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, image: e.target.value })}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description (Minimum 300 words)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  value={selectedBlog.description} 
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, description: e.target.value })}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tags (comma-separated)</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedBlog.tags.join(", ")} 
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, tags: e.target.value.split(",") })}
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>author</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedBlog.author} 
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })}
                  required 
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    <Footer/>
    </>
  );
};

export default Myblogs;
