import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("Token")
      if (!userId) {
        toast.error("User not logged in.");
        return;
      }

      try {
        const response = await axios.get(`https://grillgblogs.onrender.com/get-user/${userId}` , {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        toast.error("Error fetching user details.");
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <h3>Loading user data...</h3>;
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("Token")
    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    let formData = new FormData();
    formData.append("profile", imageFile);

    try {
      const response = await axios.post(`https://grillgblogs.onrender.com/upload/profile/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.imageUrl,
      }));
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading profile image.");
    }
  };

  const handleRemoveImage = async () => {
    const token = localStorage.getItem("Token")
    try {
      await axios.put(`https://grillgblogs.onrender.com/remove-profile-image/${userId}` , {
        headers: { Authorization: `Bearer ${token}` },
    });
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: "",
      }));
      toast.success("Profile image removed.");
    } catch (error) {
      toast.error("Failed to remove profile image.");
    }
  };
  
  const handleUpdate = async (e) => {
    const token = localStorage.getItem("Token")
    e.preventDefault();
  
    try {
      const response = await axios.put(`https://grillgblogs.onrender.com/updateUser/${userId}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      } ,
      {
        headers: { Authorization: `Bearer ${token}` }, 
      });
  
      setUser(response.data); // Update local state with new user data
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile.");
    }
  };
  
  if (!user) {
    return <h3>Loading user data...</h3>;
  }

  return (
    <>
      <div className="container  mt-4">


        <Container className="mt-4">
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">Profile Settings</h4>
            <Form >
              {/* Profile Image */}
              <Form.Group className="mb-3 text-center">
              <img
                src={user.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                alt="Profile Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div className="mt-2">
                {user.profileImage ? (
                  <Button variant="outline-danger" size="sm" onClick={handleRemoveImage}>
                    Remove Photo
                  </Button>
                ) : (
                  <>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                    <Button variant="outline-primary" size="sm" className="mt-2" onClick={handleUpload}>
                      Upload Profile
                    </Button>
                  </>
                )}
              </div>
            </Form.Group>

              
              {/* <Form.Group className="mb-3">
                <Form.Label>Upload New Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"

                />
              </Form.Group> */}

<Form.Group className="mb-3">
  <Form.Label>Name</Form.Label>
  <Form.Control
    type="text"
    name="name"
    value={user.name}
    onChange={(e) => setUser({ ...user, name: e.target.value })}
    required
  />
</Form.Group>

<Form.Group className="mb-4">
  <Form.Label>Email</Form.Label>
  <Form.Control
    type="email"
    name="email"
    value={user.email}
    onChange={(e) => setUser({ ...user, email: e.target.value })}
    required
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Phone</Form.Label>
  <Form.Control
    type="text"
    name="phone"
    value={user.phone}
    onChange={(e) => setUser({ ...user, phone: e.target.value })}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Gender</Form.Label>
  <Form.Control
    as="select"
    name="gender"
    value={user.gender}
    onChange={(e) => setUser({ ...user, gender: e.target.value })}
  >
    <option value="male">Male</option>
    <option value="female">Female</option>
  </Form.Control>
</Form.Group>

<div className="text-center">
  <Button variant="primary" type="submit" onClick={handleUpdate}>
    Save Changes
  </Button>
</div>

            </Form>
          </Card>
        </Container>
      
      </div>
    </>
  )
}

export default UserProfile