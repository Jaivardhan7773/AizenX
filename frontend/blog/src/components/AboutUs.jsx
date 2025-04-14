import React from 'react'
import Footer from './footer';
import Queryform from './queryform';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import { NavLink  ,useNavigate} from "react-router-dom";
const AboutUs = () => {

   const navigate = useNavigate();
  return (
   <>
   <div  style={{backgroundColor:"white" , minHeight:"100vh"}}>
    <div style={{backgroundColor:"#c8d6e5"}} data-aos="fade-up">
   <div className="container py-5">
  <div className="row align-items-center">
  
    <div className="col-lg-6 col-md-6 pb-sm-5 text-center text-lg-start">
      <h2 className="fw-bold">Discover about Aizen X</h2>
      <p>
        AizenX is your go-to destination for all things Desi Hip-Hop blogs, delivering the latest news, Memes, updates, and trends in the Indian blog scene. Stay tuned for exclusive content, artist interviews, and much more!
      </p>
      <button className="btn btn-outline-dark rounded-pill px-4 py-2" onClick={()=>navigate('/')}>Explore</button>
    </div>

 
    <div className="col-lg-6  col-md-6  text-center">
      <img src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Grill G" className="img-fluid rounded shadow-lg"/>
      
     
      <div className="bg-primary text-white d-flex justify-content-around align-items-center p-3 mt-3 rounded">
        <div>
          <h3 className="fw-bold">150+</h3>
          <p className="mb-0">Join Us</p>
        </div>
        <div>
          <h3 className="fw-bold">15</h3>
          <p className="mb-0">Trusted Source</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<div className="text-white text-center  py-5" data-aos="fade-up" style={{backgroundColor:"#718093" }}>
        <h1 className="fw-bold pt-5">Music Hub</h1>
        <p className="lead pb-5">
          Discover the latest in  music, artists, and hiphop culture through <br />
          our comprehensive music and blog information platform.
        </p>
      </div>

 <div className="container pt-5">
  <h1 className='card-title py-5 text-center fw-bold'>
  Get in Touch with Us
  </h1>
  <p className='card-text text-center py-5'>
  We love hearing from Blog enthusiasts like you!
  </p>

  <div className="row justify-content-center align-items-center">
        {/* Left: Contact Form */}
        <div className="col-lg-6 p-4 bg-light rounded" data-aos="fade-right" >
        <Queryform/>
        </div>

        {/* Right: Image */}
        <div className="col-lg-5 text-center">
          <img
            src="https://img.freepik.com/free-vector/company-employees-planning-task-brainstorming_74855-6316.jpg?t=st=1744026762~exp=1744030362~hmac=e1764eaa592512ca7ed4bbf4636dc0abd054a6fcb194361bddc6287397809049&w=1380"
            alt="Contact"
            className="img-fluid rounded shadow-lg"
          />
        </div>
      </div>
 </div>
  
   

   <div>
     
      <div className="text-white text-center  py-5" style={{backgroundColor:"rgb(21, 1, 42)" }}>
        <h1 className="fw-bold pt-5">Blogs hub Hub</h1>
        <p className="lead pb-5">
          Discover the latest in  music, artists, and culture through <br />
          our comprehensive blog information platform.
        </p>
      </div>

     
      <div className="text-center py-5">
        <h2 className="fw-bold pt-5">Blog Insights</h2>
        <p className="lead pb-5">Explore the world of Blogs , music and its culture.</p>
      </div>
    </div>




    <div className="container mt-4">

  <div className="row justify-content-center pb-5  g-4">
    
    <div className="col-lg-6 col-md-8 col-sm-10 d-flex justify-content-center">
      <div className="card border-0 rounded-3 shadow" style={{ maxWidth: "500px" }}>
        <img src="https://images.unsplash.com/photo-1548527388-e836c900b6c3?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw0fHxyYXAlMjBtdXNpY3xlbnwwfHx8fDE3MzU1Njc3NzV8MA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720" className="card-img-top rounded-3" alt="Music Review" />
        <div className="card-body">
          <h5 className="card-title">Music Reviews</h5>
          <p className="card-text">In-depth reviews of the latest rap albums and tracks.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-8 col-sm-10 d-flex justify-content-center">
      <div className="card border-0 rounded-3 shadow" style={{ maxWidth: "500px" }}>
        <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxMnx8cmFwJTIwbXVzaWN8ZW58MHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720" className="card-img-top rounded-3" alt="Artist Spotlights" />
        <div className="card-body">
          <h5 className="card-title">Artist Spotlights</h5>
          <p className="card-text">Highlighting influential artists and their contributions to rap.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-8 col-sm-10 d-flex justify-content-center">
      <div className="card border-0 rounded-3 shadow" style={{ maxWidth: "500px" }}>
        <img src="https://images.unsplash.com/photo-1619983081563-430f63602796?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw5fHxyYXAlMjBtdXNpY3xlbnwwfHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720" className="card-img-top rounded-3" alt="News Updates" />
        <div className="card-body">
          <h5 className="card-title">News Updates</h5>
          <p className="card-text">Stay updated with the latest happenings in rap music.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-6 col-md-8 col-sm-10 d-flex justify-content-center">
      <div className="card border-0 rounded-3 shadow" style={{ maxWidth: "500px" }}>
        <img src="https://images.unsplash.com/photo-1542395118-9d95347995bc?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxNXx8cmFwJTIwbXVzaWN8ZW58MHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720" className="card-img-top rounded-3" alt="Event Coverage" />
        <div className="card-body">
          <h5 className="card-title">Event Coverage</h5>
          <p className="card-text">Coverage of rap concerts, festivals, and community events.</p>
        </div>
      </div>
  

  </div>
</div>

</div>


    </div>

    
    <Footer/>
   </>
  )
}

export default AboutUs