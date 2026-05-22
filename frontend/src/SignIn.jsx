import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NeuralBackground from "../components/NeuralBackground.jsx";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
export default function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setMessage("✅ Registration Complete. Please Login.");
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/users/signup", {
        full_name: e.name,
        email: e.email,
        password: e.password,
        role: selectedRole
      });
      login(res.data);
      if (res.data.role === "Freelancer") {
        navigate("/freelancer/profile");
      } else {
        navigate("/client/profile");
      }
    } catch {
      alert("Invalid Credentials ❌");
    }
    setLoading(false);
  };

  return (
    <>
      <>
        <NeuralBackground />
        <Navbar />
        ...
      </>
      {loading && <LoaderOverlay message="Verifying Neural Identity..." />}

      <div style={container}>
        <div className="glow-card" style={{ width: 400 }}>
          <h2>NeuroGrid Access</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="neon-btn">Login</button>
          </form>

          <p style={{ marginTop: 15 }}>
            No account?{" "}
            <span
              style={{ color: "#00f5ff", cursor: "pointer" }}
              onClick={() => navigate("/signup-role")}
            >
              Initialize Profile
            </span>
          </p>

          {message && <p style={{ marginTop: 10 }}>{message}</p>}
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