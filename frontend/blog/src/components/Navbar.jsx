import React, { useEffect, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { Dropdown, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navbarog = () => {

  
 const navigate = useNavigate();
  const [user , setUser] = useState(null)
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []); 
  
  
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("Token");
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
  backgroundColor:"black"
}} className='mb-0 text-light'>
  Grab your hip hop gear now!
</p>

<Navbar expand="lg" className="sticky-top navblur px-lg-5">
  <Container fluid>
    <Navbar.Brand href="#" className="text-light">
      <img
        src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=352,fit=crop,q=95/mk3qxGrDvKI1EJnM/gill-mePbkJKnjKTJlQ74.png"
        alt="Grill G logo"
        style={{ maxHeight: "40px", maxWidth: "180px" }}
      />
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
              onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
            >
              Hey, {user.name}
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