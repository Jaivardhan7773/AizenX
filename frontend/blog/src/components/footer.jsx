import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [editor, setEditor] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.isEditor) {
    setEditor(false)
    } else {
     setEditor(true)
    }
  }, )
  

  const handleSubmit = async () => {

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addRequest`, { email });

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
    <footer className="text-light py-4" style={{
      minHeight: "50vh", backgroundImage: "url('https://i.postimg.cc/fbhwpSMR/wp9393501.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    }}>
      <Container>
        <Row>

          <Col md={4} className="mb-3">
            <Navbar.Brand
              href="#"
              style={{
                fontFamily: "'Tektur', sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: 700, // Adjust between 100 - 900
                fontStyle: "normal",
                fontVariationSettings: '"wdth" 100',
                fontSize: "clamp(1.2rem, 2vw, 2rem)"
              }}
            >
              <img src='https://cdn-icons-png.flaticon.com/128/8133/8133820.png' className="navbarlogo" style={{
                maxHeight: "40px", maxWidth: "40px",
                position: "relative",
                left: '5px',
                bottom: '4px'
              }} />
              izen
              <img src='https://cdn-icons-png.flaticon.com/128/16083/16083469.png' className="navbarlogo" style={{
                maxHeight: "40px",
                maxWidth: "30px",
                position: "relative",
                right: '5px'
              }} />
            </Navbar.Brand>
            <p>
              Your go-to platform for creating and managing Your BLOGS. Explore
              blogs, Stories, and more.
            </p>
            <div className='d-flex gap-3 justify-content-center'>
              <a href='#'><img src='https://cdn-icons-png.flaticon.com/128/5968/5968764.png' alt='Facebook' className='img-fluid' style={{ maxHeight: "25px", maxWidth: "25px" }} /></a>
              <a href='#'><img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='Instagram' className='img-fluid' style={{ maxHeight: "25px", maxWidth: "25px" }} /></a>
              <a href='#'><img src='https://cdn-icons-png.flaticon.com/128/5968/5968852.png' alt='YouTube' className='img-fluid' style={{ maxHeight: "30px", maxWidth: "30px" }} /></a>
              <a href='#'><img src='https://cdn-icons-png.flaticon.com/128/145/145807.png' alt='LinkedIn' className='img-fluid' style={{ maxHeight: "30px", maxWidth: "30px" }} /></a>

            </div>
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
            <p className="email-text">Email: <a href="mailto:jaivardhansinghrathore17@gmail.com">jaivardhansinghrathore17@gmail.com</a></p>
            <p>Phone: <a href="tel:+916377469206">+91 6377469206</a></p>
            <div className="wordbreak">
              <a href="https://www.instagram.com/jaivardhan7773_/#" target="_blank" className="text-light me-3">Instagram</a>
              <a href="https://x.com/Jay_Vardhan7773" target="_blank" className="text-light me-3">Twitter</a>
              <a href="https://www.linkedin.com/in/jaivardhan-singh-rathore-9a0149334" target="_blank" className="text-light">LinkedIn</a>
            </div>


            {editor ? (
              <>
              
            <h6 className="pt-5 text-start">Apply for an Editor's Post <br />
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
                required
              />
              <button
                className="btn ms-1 btn-primary"
                style={{ borderRadius: "8px" }}
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
              </>
            ) : (
              <>
<>
<h6 className="pt-5 text-center">congrats you  are a editor <br />
              so write your own blogs and social media news
            </h6>
</>
              </>
            )}



          </Col>
        </Row>


        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} AizenX BY Jaivardhan. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>


    </footer>
  );
};

export default Footer;
