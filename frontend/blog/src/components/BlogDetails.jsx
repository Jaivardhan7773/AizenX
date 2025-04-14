import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button , Row , Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Footer from './footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const BlogDetails = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
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
              className=" pb-5  d-flex flex-column " >
              <Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mx-auto text-center">{blog.title}</h5>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png"
                    alt="Go Back"
                    className="mt-2 me-2"
                    onClick={() => {
                      window.scrollTo(0, 850);
                      navigate("/");
                    }}
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                  />
                </div>
              </Card.Title>

              <Card.Text className="text-center">
                {blog.tags.join("\u00A0·\u00A0")}
              </Card.Text>
              <Card.Img
                variant="top"
                className="w-100 mb-5"
                src={blog.image}
                style={{ maxHeight: "800px", objectFit: "cover" }}
              />
              <Card.Body>
              <Card.Text className="text-start">
                {blog.introduction}
              </Card.Text>
                <Card.Text dangerouslySetInnerHTML={{ __html: blog.description }} />
                <div className="d-flex justify-content-center mt-5">
                  <Button variant="primary" onClick={() => {
                    window.scrollTo(0, 850);
                    navigate("/");
                  }}>
                    Go Back
                  </Button>
                </div>

              </Card.Body>
            </Card>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ minHeight: '100vh', padding: '1rem' }}>
            <Card className="w-100 h-100 shadow-sm" style={{ maxWidth: '1000px' }}>
            <Skeleton height={30} width="100%" highlightColor="#444" className="my-2" />
            <Skeleton height={15} width="60%" highlightColor="#444" className="mb-2 mx-auto" />
              <Skeleton height={400} width="100%" />
              <Card.Body>
                <Skeleton height={15} width="60%" highlightColor="#444" className="mb-2" />
                <Skeleton height={20} width="80%" highlightColor="#444" className="mb-2" />
                <Skeleton count={3} />
                <Skeleton height={30} width="100%" highlightColor="#444" className="my-2" />
                <Skeleton height={30} width="100%" highlightColor="#444" />
              </Card.Body>
            </Card>
          </div>
          
          )}
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default BlogDetails;
