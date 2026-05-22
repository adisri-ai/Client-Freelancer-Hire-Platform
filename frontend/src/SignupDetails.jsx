import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NeuralBackground from "../components/NeuralBackground.jsx";
import ProgressScanner from "../components/ProgressScanner.jsx";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api.js";
export default function SignupDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const role = state?.role || "Freelancer";

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const progress =
    (form.name ? 25 : 0) +
    (form.email ? 25 : 0) +
    (form.password ? 25 : 0) +
    (form.identity ? 25 : 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/users/signup", {
        full_name: form.name,
        email: form.email,
        password: form.password,
        role: selectedRole
      });

      navigate("/", { state: { signupSuccess: true } });
    } catch {
      alert("Signup Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <NeuralBackground />
      <Navbar />
      {loading && <LoaderOverlay message="Constructing Neural Profile..." />}

      <div style={container}>
        <div className="glow-card" style={{ width: 500 }}>
          <h2>Identity Verification</h2>
          <p>Selected Role: {role}</p>

          <ProgressScanner progress={progress} />

          <form onSubmit={handleSignup}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="identity" placeholder="LinkedIn URL or Student ID" onChange={handleChange} required />

            <button className="neon-btn">Complete Registration</button>
          </form>
        </div>
      </div>
    </>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};