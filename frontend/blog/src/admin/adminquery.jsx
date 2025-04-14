import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container , Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Adminquery = () => {
  const [queries, setQueries] = useState([]);
const [loading , setLoading] = useState(true)

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getQuery`  , {
        headers : { Authorization : `Bearer ${token}`}
      });
      setQueries(response.data);
      setLoading(false)
    } catch (error) {
      toast.error("Failed to fetch queries. Please try again later.");
    }
  };

  const handleDelete = async (queryId) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteQuery/${queryId}`, {
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
        <h2 className="text-center text-light">User Queries</h2>
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
      {loading ? (
        // Show 5 skeleton rows while loading
        [...Array(5)].map((_, index) => (
          <tr key={index}>
            <td><Skeleton width={20} /></td>
            <td><Skeleton width={120} /></td>
            <td><Skeleton width={150} /></td>
            <td><Skeleton width={200} /></td>
            <td><Skeleton width={120} /></td>
            <td>
              <Skeleton width={80} height={30} />
            </td>
          </tr>
        ))
      ) : queries.length > 0 ? (
        queries.map((query, index) => (
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
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            No queries found
          </td>
        </tr>
      )}
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