import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Adminquery from "./adminquery";
import Admincarousel from "./admincarousel";
import AdminBlog from "./AdminBlog";
import EditorRequest from "./EditorRequest";
import Admin from "./Admin";
import "./MayurDiCss.css" ;
import Navbar from 'react-bootstrap/Navbar';


function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Admin />); // Default component
  const [isHovered, setIsHovered] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex">
     
     <Button
  className="position-absolute ps-4 bg-transparent border-0"
  onClick={handleShow}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <img 
    src={isHovered ? 
      'https://img.icons8.com/?size=96&id=6uJdcB0tVRwZ&format=gif' : 
      'https://img.icons8.com/?size=96&id=6uJdcB0tVRwZ&format=png'} 
    alt='menu' 
    style={{ maxHeight: '30px', maxWidth: '30px' }} 
  />
</Button>

      {/* Sidebar */}
      <Offcanvas show={show} onHide={handleClose} style={{ maxWidth: "300px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="ps-5 ms-4">  <Navbar.Brand 
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
</Navbar.Brand></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="nav">
            <nav>
              <ul>
              <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<Admin/>)}>
                    Manage Users
                  </button>
                </li>
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<Adminquery />)}>
                    Admin Query
                  </button>
                </li>
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<Admincarousel />)}>
                    Admin Carousel
                  </button>
                </li>
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<AdminBlog />)}>
                    Admin Blog
                  </button>
                </li>
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<EditorRequest />)}>
                    Editor Request
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Area */}
      <div className="content-area flex-grow-1 p-3">{activeComponent}</div>
    </div>
  );
}

export default Sidebar;
