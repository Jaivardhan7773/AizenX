import React, { useState, useEffect } from 'react';
import { Modal, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from "../components/footer";


const SongLyrics = () => {
  const [lyricsList, setLyricsList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const handleCardClick = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    fetchLyrics();
  }, []);

  const fetchLyrics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/getlyrics`);
      setLyricsList(res.data);
    } catch (error) {
      toast.error("Failed to fetch lyrics.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="https://videos.pexels.com/video-files/8135080/8135080-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <section class="text-center py-5  text-light">
            <div class="container">
              <h1 class="fw-bold pb-5">Explore Your Favorite <br /> Song Lyrics</h1>
              <p class="lead">Discover a world of lyrics for every song you love and enjoy ,<br /> lyrics, and culture tailored for desi enthusiasts.</p>
              <a href="#" class="btn btn-primary  rounded-pill mb-4" style={{ minWidth: "100px" }}>Start</a>
              <div class="mt-3">
                <p class="mb-1 fs-6">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                <p class="mb-0 fs-6">Rated 5 stars by fans</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className=" bg-light">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-4">Explore Lyrics</h2>
          <p className="card-text text-center mb-5">Explore our collection of song lyrics from various artists</p>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-3">
              <div className="card shadow position-relative overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/W8x6Dwyj0-A/hq720.jpg"
                  className="card-img-top"
                  alt="Mharani Lyrics"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="position-absolute bottom-0 mb-3 start-50 translate-middle-x bg-dark text-white px-3 py-2 rounded-pill">
                  Mharani Lyrics
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow position-relative overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/dzuZ-_xscps/hq720.jpg"
                  className="card-img-top"
                  alt="Wushang Clan Lyrics"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="position-absolute bottom-0 mb-3 start-50 translate-middle-x bg-dark text-white px-3 py-2 rounded-pill">
                  Wushang Clan Lyrics
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow position-relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586095087956-bc66fe634955?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw2fHxzb25nJTIwbHlyaWNzfGVufDB8fHx8MTczNTU3ODA2Mnww&ixlib=rb-4.0.3&auto=format&fit=crop&w=590&h=960"
                  className="card-img-top"
                  alt="Lyrics"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="position-absolute bottom-0 mb-3 start-50 translate-middle-x bg-dark text-white px-3 py-2 rounded-pill">
                  Lyrics
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow position-relative overflow-hidden">
                <img
                  src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=594,h=946,fit=crop/bed-and-breakfast/images/amenities.jpg"
                  className="card-img-top"
                  alt="Cozy Vibes"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="position-absolute bottom-0 mb-3 start-50 translate-middle-x bg-dark text-white px-3 py-2 rounded-pill">
                  Cozy Vibes
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Row>
            {Array.isArray(lyricsList) && lyricsList.map((song, index) => (
              <Col md={4} sm={6} xs={12} key={index} className='mb-4'>
                <Card className='h-100 shadow' onClick={() => handleCardClick(song)} style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <Card.Title>{song.title}</Card.Title>
                    <Card.Img
                      variant="top"
                      src={song.image}
                      alt={song.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Subtitle className='mb-2 text-muted mt-1'><strong>{song.artist}</strong></Card.Subtitle>
                    {/* <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: song.lyrics.substring(0, 100) + '...' }} />
          </Card.Text> */}
                    <div className='text-muted small'>Language: {song.language}</div>
                    {/* <div className='text-muted small'>Tags: {song.hashtags.join(", ")}</div> */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>




        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="fw-bold mb-3">Your ultimate song lyrics destination.</h1>
              <p className="text-muted">
                Welcome to our site, where music lovers can explore a vast collection of song lyrics.
                Discover your favorite songs and dive into the world of music with us!
              </p>
              <button className="btn btn-outline-dark rounded-pill px-4 mb-3">Explore</button>
            </div>


            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1534515994141-d1c2260a2dd9?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw1fHxzb25nJTIwbHlyaWNzfGVufDB8fHx8MTczNTU3ODA2Mnww&ixlib=rb-4.0.3&auto=format&fit=crop&w=861&h=773"
                  alt="Lyrics Banner"
                  className="img-fluid rounded-4 shadow"
                />
                <div
                  className="position-absolute bottom-0 mb-3 start-50 translate-middle-x bg-light shadow-sm rounded-3 p-3"
                  style={{ width: "80%", transform: "translateY(50%)" }}
                >
                  <p className="mb-1 fw-bold">
                    <span className="fs-4">❝</span> Amazing collection of song lyrics!
                  </p>
                  <p className="text-muted small mb-0">Music Fan</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container">

          <h4 className='text-center mb-4'>All Uploaded Lyrics</h4>


          <Modal show={!!selectedSong} onHide={() => setSelectedSong(null)} centered size="lg">
            <Modal.Header closeButton >
              <Modal.Title >{selectedSong?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
              <h6 className='text-muted'>By <strong> {selectedSong?.artist} </strong>| Language: {selectedSong?.language}</h6>
              <hr />
              {selectedSong?.image ? (
                <img
                  src={selectedSong.image}
                  alt={selectedSong.title}
                  style={{ maxHeight: "500px",  width: "100%", borderRadius: "10px" }}
                  className='mb-3'
                />
              ) : (
                <div className='mb-3 text-muted'>No image available</div>
              )}
              <div dangerouslySetInnerHTML={{ __html: selectedSong?.lyrics }} />
              <hr />
              <p>{selectedSong?.hashtags?.join(", ")}</p>
            </Modal.Body>
          </Modal>
          <img
            src="https://images.unsplash.com/photo-1459305272254-33a7d593a851?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw3fHxzb25nJTIwbHlyaWNzfGVufDB8fHx8MTczNTU3ODA2Mnww&ixlib=rb-4.0.3&auto=format&fit=crop&w=1624&h=688"
            alt="Lyrics Banner"
            className="img-fluid  d-block rounded-4 shadow mx-auto"
            style={{ maxHeight: "400px" }}
          />


          <h3
            className="card-title text-danger text-center py-4"
          >
            <a href="mailto:jaivardhansinghrathore17@gmail.com" className="text-danger">
              <ins>Submit your lyrics here</ins>
            </a>
          </h3>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default SongLyrics;
