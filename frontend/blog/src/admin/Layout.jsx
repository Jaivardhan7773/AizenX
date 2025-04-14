import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Adminquery from "./adminquery";
import Admincarousel from "./admincarousel";
import AdminBlog from "./AdminBlog";
import EditorRequest from "./EditorRequest";
import Admin from "./Admin";
import "./MayurDiCss.css";
import Navbar from 'react-bootstrap/Navbar';
import Addlyrics from "../Lyrics/Addlyrics";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Admin />); // Default component
  const [isHovered, setIsHovered] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex">

<div >
  
<Button
        className="ps-4 bg-transparent border-0"
        onClick={handleShow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "fixed" , zIndex:"3" ,  }}
      >
        <img
          src={isHovered ?
            'https://cdn-icons-png.flaticon.com/128/8166/8166558.png' :
            'https://img.icons8.com/?size=96&id=6uJdcB0tVRwZ&format=png'}
          alt='menu'
          style={{ maxHeight: '50px', maxWidth: '50px' , transition: "all 0.3s ease-in-out", }}
        />
      </Button>
</div>


      <Offcanvas show={show} onHide={handleClose} style={{ maxWidth: "300px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="ps-5 ms-4">  <Navbar.Brand
            href="#"
            style={{
              fontFamily: "'Tektur', sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: 700, 
              fontStyle: "normal",
              fontVariationSettings: '"wdth" 100',
              fontSize: "clamp(1.2rem, 2vw, 2rem)"
            }}
          >
            <img src='https://cdn-icons-png.flaticon.com/128/8149/8149827.png' style={{
              maxHeight: "40px", maxWidth: "40px",
              position: "relative",
              left: '5px',
              bottom: '4px'
            }} />
            izen
            <img src='https://cdn-icons-png.flaticon.com/128/16083/16083469.png' style={{
              maxHeight: "40px",
              maxWidth: "30px",
              position: "relative",
              right: '5px'
            }} />
          </Navbar.Brand></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="nav">
            <nav>
              <ul>
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<Admin />)}>
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
                <li>
                  <button className="btn w-100 text-start" onClick={() => setActiveComponent(<Addlyrics />)}>
                    Manage Songs
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

     
      <div className="content-area flex-grow-1 ">{activeComponent}</div>
    </div>
  );
}

export default Sidebar;
