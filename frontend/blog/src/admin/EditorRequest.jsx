import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EditorRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token  = localStorage.getItem("Token");
    try {
      const response = await axios.get("http://localhost:5000/getrequest" ,{
        headers : { Authorization : `Bearer ${token}`}
      });
      setRequests(response.data);
    } catch (error) {
      toast.error("Failed to fetch requests. Please try again later.");
    }
  };

  const handleDelete = async (requestId) => {
    const token  = localStorage.getItem("Token");
    try {
      await axios.delete(`http://localhost:5000/deleteRequest/${requestId}` ,{
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("Request deleted successfully");
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Failed to delete request:", error);
      toast.error("Failed to delete request");
    }
  };


  

  return (
    <Container className="mt-4">
      <h2 className="text-center">User Requests</h2>
      {requests.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.email}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
                <td>
       
                  <Button variant="danger" onClick={() => handleDelete(request._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No requests available.</p>
      )}
    </Container>
  );
};

export default EditorRequest;
