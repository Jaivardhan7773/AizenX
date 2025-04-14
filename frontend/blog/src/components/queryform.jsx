import { useState } from "react";
import React  from 'react'
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Queryform = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
      });
      const [loading, setLoading] = useState(false);

const handleChange = (e) => {
    setFormData({
        ...formData ,
        [e.target.name] : e.target.value,
    });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  
  const token = localStorage.getItem("Token");
  if (!token) {
    console.log("No token found!");
    toast.error("Login first to send query");
    return;
  }

    setLoading(true);
    try{
        await axios.post(`${import.meta.env.VITE_API_URL}/addQuery` , formData);
        setFormData({ name: "", email: "", description: "" });
        toast.success("youe message has been sent successfully ")
    }
    catch(error){
        alert("Failed to send message. Please try again.");
    }
    setLoading(false);
}



  return (
   <>
             <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your First Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Email Address*</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Message*</label>
              <textarea
                className="form-control"
                placeholder="Type your message here"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-50 rounded-pill">
            {loading ? "Sending..." : "Submit Your Message"}
            </button>
          </form>
   </>
  )
}

export default Queryform