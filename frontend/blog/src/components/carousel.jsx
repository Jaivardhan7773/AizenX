import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Spinner , Row , Col , Card } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
AOS.init();


const carousel = () => {
  const navigate = useNavigate();
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedCarousel = localStorage.getItem("carousel");

    if (cachedCarousel) {
      setCarouselItems(JSON.parse(cachedCarousel));
      setLoading(false);
    } else {
      fetchCarousel();
    }
  }, []);

  const fetchCarousel = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allCars`);
      setCarouselItems(response.data);
      localStorage.setItem("carousel", JSON.stringify(response.data)); // Update cache
    } catch (error) {
      console.error("Failed to fetch carousel items!", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container">

      <section className="text-center py-5  text-light">
        <div className="container">
          <h1 className="fw-bold">Unleash Your Desi Hip <br /> Hop Style</h1>
          <p className="lead">Explore the latest in hip hop fashion, lyrics, and culture tailored for desi enthusiasts.</p>
          <NavLink to="/soon" className="shopbtn" style={{ minWidth: "100px" }}>
            Shop
          </NavLink>

          <div className="mt-3">
            <p className="mb-1">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
            <p className="mb-0">Rated 5 stars by fans</p>
          </div>
        </div>
      </section>

      {loading ? (
 <Row className="mt-3">
 {[1].map((_, idx) => (
   <Col md={12} key={idx} className="mb-4">
     <Card className="h-100 shadow-sm border-0">
       <Skeleton
         height={400}
         style={{ borderRadius: "10px", objectFit: "cover" }}
         baseColor="#ccc"
         highlightColor="#999"
       />
       <Card.Body className="position-absolute bottom-0 start-0 w-100 p-3">
         <Skeleton
           height={30}
           width="40%"
           style={{
             borderRadius: "5px",
             marginBottom: "8px",
             backgroundColor: "rgba(0,0,0,0.6)",
           }}
         />
         <Skeleton
           height={20}
           width="70%"
           style={{
             borderRadius: "5px",
             backgroundColor: "rgba(0,0,0,0.4)",
           }}
         />
       </Card.Body>
     </Card>
   </Col>
 ))}
</Row>
      ) : (
        <Carousel slide={true} data-aos="zoom-in-up">
          {carouselItems.length > 0 ? (
            carouselItems.map((item) => (
              <Carousel.Item key={item._id} >
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    transition: "opacity 0.3s ease-in-out",
                  }}

                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p className="text-white" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <Row className="mt-3">
            {[1].map((_, idx) => (
              <Col md={12} key={idx} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Skeleton
                    height={400}
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                    baseColor="#ccc"
                    highlightColor="#999"
                  />
                  <Card.Body className="position-absolute bottom-0 start-0 w-100 p-3">
                    <Skeleton
                      height={30}
                      width="40%"
                      style={{
                        borderRadius: "5px",
                        marginBottom: "8px",
                        backgroundColor: "rgba(0,0,0,0.6)",
                      }}
                    />
                    <Skeleton
                      height={20}
                      width="70%"
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          )}
        </Carousel>
      )}
    </div>

  );
};

export default carousel;
