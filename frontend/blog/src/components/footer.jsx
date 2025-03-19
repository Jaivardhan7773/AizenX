import React from "react";
import  { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/addRequest", { email });
  
      if (response.status === 201) {  
        toast.success("Request submitted successfully!");
        setEmail(""); 
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error(error.response?.data?.message || "Failed to submit request.");
    }
  };
  
  return (
    <footer className="bg-dark text-light py-4" style={{minHeight:"50vh"}}>
      <Container>
        <Row>
      
          <Col md={4} className="mb-3">
            <h5>BLOGS WEB.COM</h5>
            <p>
              Your go-to platform for creating and managing Your BLOGS. Explore
              blogs, Stories, and more.
            </p>
          </Col>

       
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="text-light">Home</NavLink></li>
              <li><NavLink to="/totalblogs" className="text-light">Blogs</NavLink></li>
              <li><NavLink to="/user/myblogs" className="text-light">my blogs</NavLink></li>
              <li><NavLink to="/admin/manage-users" className="text-light">Admin Panel</NavLink></li>
            </ul>
          </Col>

         
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@blogsbyjay.com</p>
            <p>Phone: +91 6377469206</p>
            <div>
              <a href="https://facebook.com" className="text-light me-3">Facebook</a>
              <a href="https://twitter.com" className="text-light me-3">Twitter</a>
              <a href="https://linkedin.com" className="text-light">LinkedIn</a>
            </div>

          
          <h6 className="pt-5 text-start">Apply for an Editor's Post <br/>
          and write your own blogs and social media news
          </h6>
          <div className="d-flex">
      <input
        type="email"
        className="form-control w-50"
        placeholder="Your email for Request"
        style={{ borderRadius: "8px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn ms-1 btn-primary"
        style={{ borderRadius: "8px" }}
        onClick={handleSubmit}
      >
        Submit Request
      </button>
    </div>
          </Col>
        </Row>

      
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} BLOGS BY Jay. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
