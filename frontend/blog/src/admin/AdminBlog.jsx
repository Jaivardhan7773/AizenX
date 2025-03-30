import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
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
        }
    };

    const handleDeleteblog = async (blogId) => {
        const token = localStorage.getItem("Token");
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await axios.delete(`https://grillgblogs.onrender.com/deleteBlog/${blogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Blog deleted successfully!");
            fetchAllBlogs();
        } catch (error) {
            toast.error("Failed to delete blog.");
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        (`${blog.title} ${blog.description} ${blog.tags.join(" ")} ${blog.author}`
            .toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "" || blog.category === categoryFilter)
    );

    return (
        <>
            <Container className="mt-4">
                <h2 className="text-center mb-4 text-light">All Blogs</h2>
                <div className="d-flex justify-content-between mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="me-3"
                    />
                    <Form.Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-auto"
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
                        filteredBlogs.map((blog) => (
                            <Col md={4} key={blog._id} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ height: "200px", objectFit: "cover" }} />
                                    <Card.Body>
                                        <Card.Text>{blog.tags.join(" · ")}</Card.Text>
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>{blog.description.substring(0, 100)}...</Card.Text>
                                        <Card.Text className="d-flex justify-content-between">
                                            <span className="fw-bold">{blog.author}</span>
                                            <span>{blog.category}</span>
                                        </Card.Text>
                                        <Card.Text>{new Date(blog.createdAt).toISOString().split("T")[0]}</Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/blog/${blog._id}`)} className="w-100">
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
    );
};

export default AdminBlog;
