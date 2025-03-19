import React ,{useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { NavLink  , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [captchaToken, setCaptchaToken] = useState("");
const navigate = useNavigate();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
  });




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please verify that you are human.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
      });

toast.success(response.data.message);
      
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
      });
 navigate("/login")
    } catch (error) {

      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Container className="d-flex justify-content-center align-items-center">
        <Form className="p-4 " style={{
        background: "rgba(99, 74, 74, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.91)",
        width:"400px"
      }} onSubmit={handleSubmit}>
          <h3 className="text-center mb-4 text-light">Sign Up</h3>



          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text-light">Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label  className="text-light">Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label  className="text-light">Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label  className="text-light">Confirm Password</Form.Label>
            <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label  className="text-light">Gender</Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleChange} required >
              <option value=""  className="text-light">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label  className="text-light">Phone Number</Form.Label>
            <Form.Control type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
          <div className="d-flex justify-content-center w-100 mb-3">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
          <Button variant="primary" type="submit" className="w-100">Sign Up</Button>

          <p className="text-center mt-3 text-light">
            Already have an account?{" "}
            <NavLink to="/login" className="text-warning text-decoration-none">Login here</NavLink>
          </p>
        </Form>
      </Container>
    </div>

  );
};

export default Signup;
