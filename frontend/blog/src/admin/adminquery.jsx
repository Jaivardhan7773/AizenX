import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container , Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Adminquery = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.get("https://grillgblogs.onrender.com/getQuery"  , {
        headers : { Authorization : `Bearer ${token}`}
      });
      setQueries(response.data);
    } catch (error) {
      toast.error("Failed to fetch queries. Please try again later.");
    }
  };

  const handleDelete = async (queryId) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`https://grillgblogs.onrender.com/deleteQuery/${queryId}`, {
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("Query deleted successfully");
      setQueries((prevQueries) => prevQueries.filter(query => query._id !== queryId));
    } catch (error) {
      console.error("Failed to delete query:", error);
      toast.error("Failed to delete query");
    }
  };
  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center">User Queries</h2>
        {queries.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={query._id}>
                  <td>{index + 1}</td>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>{query.description}</td>
                  <td>{new Date(query.createdAt).toLocaleString()}</td>
                  <td>
                  <Button variant="danger" onClick={() => handleDelete(query._id)}>
                    Delete
                  </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No queries available.</p>
        )}
      </Container>
    </>
  )
}

export default Adminquery;