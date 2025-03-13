import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Spinner } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();


const carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allCars");
      setCarouselItems(response.data);
      localStorage.setItem("carousel", JSON.stringify(response.data)); // Update cache
    } catch (error) {
      console.error("Failed to fetch carousel items!", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container pt-5">

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Carousel slide={false}  data-aos="zoom-in-up">
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
    opacity: 0.7,
    transition: "opacity 0.3s ease-in-out",
  }}
  onMouseEnter={(e) => (e.target.style.opacity = 1)}
  onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <p className="text-center">No carousel items available.</p>
          )}
        </Carousel>
      )}
    </div>

  );
};

export default carousel;
