import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Row, Card, Col } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Addlyrics = () => {

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        language: "",
        lyrics: "",
        hashtags: "",
        image: ""
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [songToDelete, setSongToDelete] = useState(null);
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


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, lyrics: content }));
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("Token");
        e.preventDefault();
        const { title, artist, language, lyrics, hashtags, image } = formData;

        if (!title || !artist || !language || !lyrics || !hashtags || !image) {
            return toast.error("Please fill out all fields.");
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/postlyrics`, {
                title,
                artist,
                language,
                lyrics,
                hashtags,
                image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Lyrics added successfully!");
            setFormData({
                title: "",
                artist: "",
                language: "",
                lyrics: "",
                hashtags: "",
                image: ""
            });
        } catch (error) {
            toast.error("Error posting lyrics.");
            console.error(error);
        }
    };


    const handleDelete = async () => {
        const token = localStorage.getItem("Token");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/deletelyrics/${songToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                setLyricsList(prev => prev.filter(song => song._id !== songToDelete._id));
                setShowConfirm(false);
                setSongToDelete(null);
                toast.success("song deleted")
            } else {
                console.error("Failed to delete lyrics");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>





            <div className="container mb-5 py-5 bg-light">
                <h3 className='text-center mb-4'>Add New Song Lyrics</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Song Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Enter song name'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control
                            type='text'
                            name='artist'
                            value={formData.artist}
                            onChange={handleChange}
                            placeholder='Enter artist name'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            type='text'
                            name='language'
                            value={formData.language}
                            onChange={handleChange}
                            placeholder='Enter song language'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} required />
                        <span >Dont have a link , Make direct link from here : </span> <a href="https://postimages.org/" target="_blank">postimages</a>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Lyrics</Form.Label>
                        <Editor
                            value={formData.lyrics}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist',
                                    'autolink',
                                    'lists',
                                    'link',
                                    'image',
                                    'charmap',
                                    'preview',
                                    'anchor',
                                    'searchreplace',
                                    'visualblocks',
                                    'code',
                                    'fullscreen',
                                    'insertdatetime',
                                    'media',
                                    'table',
                                    'help',
                                    'wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | link image media | removeformat | code | fullscreen | preview | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                // You might need to specify the path to your self-hosted TinyMCE resources
                                external_plugins: {
                                    // Example: 'image': '/path/to/your/custom/image/plugin.js'
                                },
                            }}
                            onEditorChange={handleEditorChange}
                        />

                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <Form.Label>Hashtags (comma-separated)</Form.Label>
                        <Form.Control
                            type='text'
                            name='hashtags'
                            value={formData.hashtags}
                            onChange={handleChange}
                            placeholder='e.g. love,song,2024'
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='w-100'>Submit Lyrics</Button>
                </Form>
            </div>


            <div className="container">
                <Row>
                    {lyricsList.map((song, index) => (
                        <Col md={4} sm={6} xs={12} key={index} className='mb-4'>
                            <Card className='h-100 shadow' onClick={() => handleCardClick(song)} style={{ cursor: "pointer" }}>
                                <Card.Body>
                                    <Card.Title>{song.title}</Card.Title>
                                    <Card.Img
                                        variant="top"
                                        src={song.image}
                                        alt={song.title}
                                        style={{ height: "400px", objectFit: "cover" }}
                                    />
                                    <Card.Subtitle className='mb-2 text-muted mt-1'>{song.artist}</Card.Subtitle>
                                    {/* <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: song.lyrics.substring(0, 100) + '...' }} />
          </Card.Text> */}
                                    <div className='text-muted small'>Language: {song.language}</div>
                                    {/* <div className='text-muted small'>Tags: {song.hashtags.join(", ")}</div> */}
                                    <Button variant='light' className='btn-outline-dark rounded-pill mt-1' size="sm" onClick={(e) => {
                                        e.stopPropagation();
                                        setSongToDelete(song);
                                        setShowConfirm(true);
                                    }}>
                                        Delete
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <strong>{songToDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            <Container className='py-5 '>




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
                                style={{ height: "200px", objectFit: "cover", width: "100%", borderRadius: "10px" }}
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
            </Container>
        </>
    )
}

export default Addlyrics