import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Allblogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;
    const navigate = useNavigate();
    
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
    
   
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    
    return (
      <div className="bg-light">
        <Container className="mt-4 pt-5">
          <Row>
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <Col lg={6} key={blog._id} className="mb-4">
                  <Card className="cardbg" data-aos="zoom-in-up" style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${blog._id}`)}>
                    <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ maxHeight: "400px", minHeight: "400px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Text>{blog.tags.join("\u00A0·\u00A0")}<br /></Card.Text>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>{blog.description.substring(0, 300)}...</Card.Text>
                      <Card.Text className="text-secondary fw-bold">{blog.author}<br /></Card.Text>
                      <Card.Text>{new Date(blog.createdAt).toISOString().split("T")[0]}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No blogs available.</p>
            )}
          </Row>

      
          {totalPages > 1 && (
  <Pagination className="justify-content-center py-5">

    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />


    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />


    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
      .map((page, index, array) => (
        <>
          {index > 0 && page !== array[index - 1] + 1 && <Pagination.Ellipsis disabled />}
          <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
          </Pagination.Item>
        </>
      ))}

  
    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />

   
    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
  </Pagination>
)}
        </Container>
      </div>
    );
};

export default Allblogs;
