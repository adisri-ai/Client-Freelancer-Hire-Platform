import { useState, useContext, useEffect } from "react";
import axios from "axios";
import ClientNavbar from "../../components/ClientNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../../freelancer.css";
import api from "../../api.js";

export default function RateReview() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MOCK_MODE = true;

  const [projectId, setProjectId] = useState("");
  const [validProject, setValidProject] = useState(false);
  const [freelancerId, setFreelancerId] = useState("");
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if(MOCK_MODE){
      return;
    }
    if (!user || user.role !== "Client") {
      navigate("/signin");
    }
  }, [user]);

  const validateProject = async () => {
    if (MOCK_MODE) {
      setValidProject(true);
      setFreelancerId("F123");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.randomurl.com/api/client/validate-project/${projectId}`
      );

      setValidProject(true);
      setFreelancerId(res.data.freelancerId);
    } catch {
      alert("Invalid Project ID or not your project.");
      setValidProject(false);
    }
  };

  const submitReview = async () => {
    try {
      await api.post(
        "/api/reviews/",
        {
          freelancer_id : freelancerId,
          client_id : client_id,
          stars : stars,
          description : feedback
        }
      );

      alert("✅ Review Submitted");
    } catch {
      alert("❌ Failed to submit review");
    }
  };

  return (
    <>
      <NeuralBackground />
      <ClientNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">
          Rate & Review Freelancer
        </h2>

        <div className="freelancer-card">

          {!validProject && (
            <>
              <input
                className="freelancer-input"
                placeholder="Enter Project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />

              <button className="neon-btn" onClick={validateProject}>
                Validate Project
              </button>
            </>
          )}

          {validProject && (
            <>
              <h3>Freelancer ID: {freelancerId}</h3>

              <div className="stars-container">
                {[1,2,3,4,5].map((num) => (
                  <span
                    key={num}
                    className={`star ${stars >= num ? "active-star" : ""}`}
                    onClick={() => setStars(num)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                className="freelancer-input"
                placeholder="Write feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button className="neon-btn" onClick={submitReview}>
                Submit Review
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}