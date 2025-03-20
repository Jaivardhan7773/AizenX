import React, { useEffect, useState } from "react";
import { Button, Carousel, Spinner, Form, Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", image: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Prevents double clicks

  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      const response = await axios.get("https://grillgblogs.onrender.com/allCars");
      setCarouselItems(response.data);
    } catch (error) {
      console.error("Failed to fetch carousel items!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const token = localStorage.getItem("Token");
    try {
      const res = await axios.post("https://grillgblogs.onrender.com/addCar", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarouselItems([...carouselItems, res.data.data]);
      setShowModal(false);
      setFormData({ title: "", image: "", description: "" });
      toast.success("Carousel added successfully");
    } catch (error) {
      console.error("Error adding carousel item:", error);
      toast.error("Error adding carousel item");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeletecar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`https://grillgblogs.onrender.com/deleteCar/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarouselItems(carouselItems.filter((item) => item._id !== id));
      toast.success("Carousel deleted successfully");
    } catch (error) {
      console.error("Failed to delete carousel item!", error);
      toast.error("Failed to delete carousel");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, image: item.image, description: item.description });
    setShowModal(true);
    setIsEditing(true);
  };

  const handleUpdatecar = async () => {
    if (isProcessing || !editingItem) return;
    setIsProcessing(true);
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.put(`http://localhost:5000/updateCar/${editingItem._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarouselItems(
        carouselItems.map((item) => (item._id === editingItem._id ? response.data.data : item))
      );
      setShowModal(false);
      toast.success("Carousel updated");
    } catch (error) {
      toast.error("Unable to update carousel");
      console.error("Failed to update carousel item!", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Row>
        <div className="container mt-4">
          <h2 className="text-center">Image Carousel</h2>
          <div className="text-center mb-3">
            <Button
              variant="success"
              onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                setFormData({ title: "", image: "", description: "" });
              }}
            >
              Add New Carousel Item
            </Button>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Carousel slide={false}>
              {carouselItems.length > 0 ? (
                carouselItems.map((item) => (
                  <Carousel.Item key={item._id}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt={item.title}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeletecar(item._id)}>
                        Delete
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
              ) : (
                <p className="text-center">No carousel items available.</p>
              )}
            </Carousel>
          )}

          {/* Modal for Editing or Adding Carousel Item */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Carousel Item" : "Add New Carousel Item"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={isEditing ? handleUpdatecar : handleAdd}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : isEditing ? "Save Changes" : "Add Item"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Row>
    </>
  );
};

export default AdminCarousel;
