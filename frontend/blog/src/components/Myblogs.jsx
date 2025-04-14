import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


import Footer from './footer';
const Myblogs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
    author: user?.name || "",
    introduction: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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
        headers: { Authorization: `Bearer ${token}` },
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


    if (!blogData.category) {
      return toast.error("Please select a category.");
    }

    try {
      await axios.post("http://localhost:5000/addBlog",
        { ...blogData, userId, tags: blogData.tags.split(","), category: blogData.category }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog posted successfully!");
      setBlogData({ title: "", image: "", description: "", tags: "", author: "", category: "", introduction: "" });
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
        headers: { Authorization: `Bearer ${token}` },
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
        , {
          headers: { Authorization: `Bearer ${token}` },
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
            <Form.Control type="text" name="title" value={blogData.title} className="text-light bg-dark" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-light">Image URL</Form.Label>
            <Form.Control type="text" name="image" value={blogData.image} className="text-light bg-dark" onChange={handleChange} required />
            <span className=" text-light">Dont have a link , Make direct link from here : </span> <a href="https://postimages.org/" target="_blank">postimages</a>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Introduction (40 -50 Words)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="introduction"
              value={blogData.introduction}
              className="text-light bg-dark"
              onChange={handleChange}
              required
            />
          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label className="text-light">Blog (Minimum 300 words)</Form.Label>
            <Editor
              onEditorChange={(content) =>
                setBlogData((prevData) => ({ ...prevData, description: content }))
              }
              value={blogData.description}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'help',
                  'wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image media | ' +
                  'removeformat | code preview fullscreen | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />

          </Form.Group>




          <Form.Group className="mb-3">
            <Form.Label className=" text-light">Tags (hastags)</Form.Label>
            <Form.Control type="text" name="tags" className="text-light bg-dark" value={blogData.tags} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className=" text-light">Author Name</Form.Label>
            <Form.Control type="text" name="author" className="text-light bg-dark" value={blogData.author} onChange={handleChange} required readOnly disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Category</Form.Label>
            <Form.Select name="category" className="text-light bg-dark" value={blogData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" type="submit" className=" text-light w-50 mb-5">Post Blog</Button>
        </Form>

        <h2 className="text-center mt-5 text-light">Your Blogs</h2>
        {blogs.length > 0 ? (
          <Row className="mt-3">
            {blogs.map((blog) => (
              <Col md={6} sm={6} xs={12} key={blog._id} className="mb-4">
                <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }}>
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    alt={blog.title}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  />
                  <Card.Body>
                    <Card.Text className="text-secondary" style={{ fontFamily: "Helvetica, Arial, sans-serif", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                      {blog.tags.join("\u00A0·\u00A0")}

                    </Card.Text>
                    <Card.Title className="text-truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{blog.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {blog.introduction?.substring(0, 200) || "No intro"}...
                    </Card.Text>
                    <Card.Text className=" d-flex justify-content-between">
                      <span className=" fw-bold">{blog.author}</span>
                      <span className="">{blog.category}</span>
                    </Card.Text>
                    <Card.Text className="">

                      {new Date(blog.createdAt).toISOString().split("T")[0]}
                    </Card.Text>
                    <Button variant="warning" className="me-2 my-1 w-100" onClick={() => { setSelectedBlog(blog); setShowModal(true); }}>Update</Button>
                    <Button variant="danger" className="me-2 w-100" onClick={() => handleDelete(blog._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>


        ) : (
          <Row className="mt-3">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <Col md={4} sm={6} xs={12} key={idx} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Skeleton height={200} />
                  <Card.Body>
                    <Skeleton height={15} width={`60%`} highlightColor="#444" className="mb-2" />
                    <Skeleton height={20} width={`80%`} highlightColor="#444" className="mb-2" />
                    <Skeleton count={3} />
                    <Skeleton height={30} width={`100%`} highlightColor="#444" className="my-2" />
                    <Skeleton height={30} width={`100%`} highlightColor="#444" />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
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
                  <Form.Label>introduction</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={selectedBlog.introduction}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, introduction: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description (Minimum 300 words)</Form.Label>
                  {/* <Form.Control
                    as="textarea"
                    rows={5}
                    value={selectedBlog.description}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, description: e.target.value })}
                    required
                  /> */}
                  <Editor
                    onEditorChange={(content) =>
                      setSelectedBlog((prevData) => ({ ...prevData, description: content }))
                    }
                    value={selectedBlog.description}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic underline | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image media | ' +
                        'removeformat | code preview fullscreen | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      // Self-hosted TinyMCE configuration
                      url: '/tinymce.min.js', // Path to the locally hosted TinyMCE script
                      inline: false, // Optional: set to false if you prefer to use a WYSIWYG editor
                      // Additional self-hosted settings (if needed)
                    }}
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
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={selectedBlog.category}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                  </Form.Select>
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
      <Footer />
    </>
  );
};

export default Myblogs;
