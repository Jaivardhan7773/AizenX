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
      const response = await axios.get("https://grillgblogs.onrender.com/allCars");
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

<section class="text-center py-5  text-light">
        <div class="container">
            <h1 class="fw-bold">Unleash Your Desi Hip <br/> Hop Style</h1>
            <p class="lead">Explore the latest in hip hop fashion, lyrics, and culture tailored for desi enthusiasts.</p>
            <a href="#" class="btn btn-primary  rounded-pill" style={{minWidth:"100px"}}>Shop</a>
            <div class="mt-3">
                <p class="mb-1">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                <p class="mb-0">Rated 5 stars by fans</p>
            </div>
        </div>
    </section>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Carousel slide={true}  data-aos="zoom-in-up">
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
            <p className="text-center">No carousel items available.</p>
          )}
        </Carousel>
      )}
    </div>

  );
};

export default carousel;
