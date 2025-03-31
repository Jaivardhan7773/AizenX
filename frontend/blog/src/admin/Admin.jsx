import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Accordion from 'react-bootstrap/Accordion';
import Adminquery from './adminquery'
import Admincarousel from "./admincarousel";
import AdminBlog from "./AdminBlog";
import EditorRequest from "./EditorRequest";
const Admin = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("https://grillgblogs.onrender.com/getUsers" , {
          headers : {Authorization: `Bearer ${token}`},
        });
        
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);




  const makeEditor = async (userId) => {
    const token = localStorage.getItem("Token")
    try {
      await axios.patch(`https://grillgblogs.onrender.com/makeEditor/${userId}` , {} , {
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("user is now Editor");
     
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isEditor: true } : user
        )
      );
    }
    catch (error) {
      toast.error("cannot make user Editor")
    }
  };

  const removeEditor = async (userId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.patch(`https://grillgblogs.onrender.com/removeEditor/${userId}` , {} ,{
        headers : {Authorization : `Bearer ${token}`}
      });
      toast.success("Editor privileges removed");
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isEditor: false } : user
        )
      );
    } catch (error) {
      toast.error("Failed to remove Editor");
    }
  };



  const makeAdmin = async (userId) => {
    const token = localStorage.getItem("Token")
    try {
      await axios.patch(`https://grillgblogs.onrender.com/makeAdmin/${userId}` , {} , {
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("user is now admin");
      // fetchUsers();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: true } : user
        )
      );
    }
    catch (error) {
      toast.error("cannot make user admin")
    }
  };

  const removeAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.patch(`https://grillgblogs.onrender.com/removeAdmin/${userId}` , {} ,{
        headers : {Authorization : `Bearer ${token}`}
      });
      toast.success("Admin privileges removed");
      // fetchUsers();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: false } : user
        )
      );
    } catch (error) {
      toast.error("Failed to remove admin.");
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`https://grillgblogs.onrender.com/deleteUser/${userId}` , {
        headers : {Authorization : `Bearer ${token}`}
      });
      toast.success("user deleted successfully");
      setUsers(users.filter((user) => user._id !== userId));
    }
    catch (error) {
      toast.error("Failed to delete user.");
    }
  }




  return (
    <>

  
            <Container className="mt-4">
              <h2 className="text-center text-light mb-3">User Management</h2>
              <div className="table-responsive" style={{ overflowX: 'visible' }}>
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Admin</th>
                    <th>Editor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.gender}</td>
                        <td>{user.isAdmin ? "✅ Yes" : "❌ No"}</td>
                        <td>{user.isEditor ? "✅ Yes" : "❌ No"}</td>
                        <td>
                        {user.isEditor ? (
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => removeEditor(user._id)}
                            >
                              Remove Editor
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              size="sm"
                              className="me-2"
                              onClick={() => makeEditor(user._id)}
                            >
                              Make Editor
                            </Button>
                          )}
                          {user.isAdmin ? (
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => removeAdmin(user._id)}
                            >
                              Remove Admin
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              size="sm"
                              className="me-2"
                              onClick={() => makeAdmin(user._id)}
                            >
                              Make Admin
                            </Button>
                          )}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                            Delete
                          </Button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              </div>
            </Container>
       


    </>
  )
}

export default Admin