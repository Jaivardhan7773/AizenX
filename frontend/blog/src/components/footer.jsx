import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
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
