import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
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
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSendOtp = async () => {

    if (!formData.email) {
      toast.error("Please enter an email first.");
      return;
    }
    setIsOtpSending(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/send-otp`, {
        email: formData.email,
      });
      setIsOtpSending(false);
      toast.success("OTP sent to your email!");
      setOtpSent(true);
      setResendDisabled(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setIsOtpSending(false);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      toast.error("Please verify your email by entering OTP.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please verify that you are human.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        otp: formData.otp,
      });

      toast.success(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        otp: "",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="p-4 my-5"
          style={{
            background: "rgba(99, 74, 74, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.91)",
            width: "400px",
          }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4 text-light">Sign Up</h3>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </Form.Group>

          {otpSent && (
            <Form.Group className="mb-3">
              <Form.Label className="text-warning ">Enter OTP</Form.Label>
              <Form.Control
                type="text"
                name="otp"
                className="border border-warning border-3 text-success"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center w-100 mb-3">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {!otpSent ? (
            <Button variant="primary" className="mt-2 w-100" onClick={handleSendOtp}>
              {isOtpSending ? <><img src="https://s6.gifyu.com/images/bMwzP.gif" style={{ maxHeight: "25px", width: "50px" }} alt="Loading" /></> : "Verify Email "}
            </Button>
          ) : (
            <>
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
              <p className="text-center mt-3 text-light" style={{ cursor: "pointer" }}>
                {resendDisabled ? `Resend OTP in ${timer}s` : (
                  <span
                  className="text-primary"
                    onClick={handleSendOtp}
                    style={{ cursor: "pointer", color: "#0d6efd", textDecoration: "underline" }}
                  >
                    Resend OTP
                  </span>
                )}
              </p>

            </>
          )}



          <p className="text-center mt-3 text-light">
            Already have an account?{" "}
            <NavLink to="/login" className="text-warning text-decoration-none">
              Login here
            </NavLink>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
