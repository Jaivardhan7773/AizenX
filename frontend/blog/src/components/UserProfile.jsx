import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    if (getUser) {
      setUser(getUser);
      setUpdatedUser({
        name: getUser.name,
        email: getUser.email,
        phone: getUser.phone,
        gender: getUser.gender,
      });
    }
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.put(`http://localhost:5000/updateUser/${user._id}`, updatedUser , {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
 <div className="container mt-4">
      <h2 className="text-light">User Profile</h2>
      {user ? (
        <div className="card p-4 shadow-lg rounded">
          <h3>Name: {user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}</p>
          <Button variant="primary" className="mt-3" onClick={() => setShowModal(true)}>
            Update Profile
          </Button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      {/* Update Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={updatedUser.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={updatedUser.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={updatedUser.phone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={updatedUser.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}

export default UserProfile