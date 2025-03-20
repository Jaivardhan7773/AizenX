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
      const response = await axios.get(`https://grillgblogs.onrender.com/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      toast.error("Failed to fetch blog details.");
    }
  };

  return (
    <>
    <div className="bg-light">
<Container className="pt-5">
  {blog ? (
    <Card
      className="mb-5 pb-5  d-flex flex-column align-items-center" >
      <Card.Title className="text-center">{blog.title}</Card.Title>
      <Card.Text className="text-center">
         {blog.tags.join("\u00A0·\u00A0")}
      </Card.Text>
      <Card.Img
        variant="top"
        className="w-100 mb-5"
        src={blog.image}
        style={{ maxHeight: "800px", objectFit: "cover" ,maxWidth:"800px"  }}
      />
      <Card.Body>
        <Card.Text>{blog.description}</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <p className="text-center text-white">Loading blog...</p>  
  )}
</Container>
</div>
</>
  );
};

export default BlogDetails;
