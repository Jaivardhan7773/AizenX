import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      toast.error("Failed to fetch blog details.");
    }
  };

  return (
<Container className="mt-4">
  {blog ? (
    <Card
      className="mb-5 pb-5 text-white"
      style={{
        background: "rgba(0, 0, 0, 0.5)",  
        backdropFilter: "blur(10px)", 
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.3)"
      }}
    >
      <Card.Title className="text-center">{blog.title}</Card.Title>
      <Card.Text className="text-center">
        <strong>Author</strong> {blog.tags.join(", ")}
      </Card.Text>
      <Card.Img
        variant="top"
        className="w-100 mb-5"
        src={blog.image}
        style={{ maxHeight: "700px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Text>{blog.description}</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <p className="text-center text-white">Loading blog...</p>  
  )}
</Container>

  );
};

export default BlogDetails;
