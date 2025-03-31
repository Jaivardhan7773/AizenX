import React, { useEffect, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { Dropdown, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";

const Navbarog = () => {

  
 const navigate = useNavigate();
  const [user , setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []); 
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("Token")
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(`https://grillgblogs.onrender.com/get-user/${userId}` , {
          headers: { Authorization: `Bearer ${token}` },
      });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        toast.error("Error fetching user details.");
      }
    };

    fetchUser();
  }, [userId]);
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    localStorage.removeItem("_grecaptcha")
    setUser(null);
    toast.success("Logged out successfully");
    navigate('/login');
    window.location.reload();

  };
  
;  return (
    <>
    <p style={{
  whiteSpace: "nowrap", 
  textAlign: "center", 
  fontWeight: "bold" ,
  backgroundColor:"black",
  cursor:"pointer"
}} className='mb-0 text-light' onClick={()=>navigate('/soon')}>
  Grab your hip hop gear now!
</p>

<Navbar expand="lg" className="sticky-top navblur px-lg-5">
  <Container fluid>
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
  Aizenx
</Navbar.Brand>




    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      {/* Centering the NavLinks */}
      <Nav className="mx-auto d-flex justify-content-center w-100" navbarScroll>
        <Nav.Link as={NavLink} to="/" className=" px-3"   style={({ isActive }) => ({
    position: "relative",
    textDecoration: "none",
  })}>
          Home
        </Nav.Link>
        {user?.isEditor && (
          <Nav.Link as={NavLink} to="/user/myblogs" className=" px-3">
             My Blogs
          </Nav.Link>
        )}
        <Nav.Link as={NavLink} to="/totalblogs" className=" px-3">
          All Blogs
        </Nav.Link>
        {user?.isAdmin && (
          <Nav.Link as={NavLink} to="/admin/manage-users" className=" px-3">
            Admin Panel
          </Nav.Link>
        )}
              <Nav.Link as={NavLink} to="/vedio" className=" px-3">
          Song Lyrics
        </Nav.Link>
        <Nav.Link as={NavLink} to="/aboutus" className=" px-3">
          About Us
        </Nav.Link>
      </Nav>

      {/* User Dropdown / Auth Buttons */}
      <Form className="d-flex">
        {user ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="warning"
              className="border border-gray-301 rounded-pill"
              id="user-dropdown"
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 1.8)}
            >
              <img
                src={user?.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                alt="Profile Preview"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />  &nbsp; &nbsp;{user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow">
              <Dropdown.Item as={NavLink} to="/Userprofile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="danger rounded-pill" id="auth-dropdown">
              SignUp/Login
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow">
              <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/signup">Sign Up</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  )
}

export default Navbarog;