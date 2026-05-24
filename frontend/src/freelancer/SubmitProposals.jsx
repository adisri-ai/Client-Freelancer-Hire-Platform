import { useState, useContext } from "react";
import axios from "axios";
import FreelancerNavbar from "../../components/FreelancerNavbar";
import NeuralBackground from "../../components/NeuralBackground";
import { AuthContext } from "../../context/AuthContext";
import "../../freelancer.css";
import api from "../../api.js";
const MOCK_MODE = 1;
export default function SubmitProposals() {
  const { user } = useContext(AuthContext);
  
  const [form, setForm] = useState({
    projectId: "",
    bidAmount: "",
    timeline: "",
    coverMessage: ""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/api/marketplace/proposals",
        {
          "proposal_id": e.projectId,
          "project_id": e.projectId,
          "freelancer_id": user.user_id,
          "bid_amount": e.bidAmount,
          "estimated_days": e.timeline,
          "cover_letter": e.coverMessage,
        }
      );

      alert("✅ Proposal Submitted Successfully!");
    } catch {
      alert("❌ Failed to submit proposal");
    }
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">Submit Proposal</h2>

        <div className="freelancer-card">
          <form onSubmit={handleSubmit}>
            <label>Project ID</label>
            <input
              className="freelancer-input"
              name="projectId"
              onChange={handleChange}
              required
            />

            <label>Bid Amount ($)</label>
            <input
              className="freelancer-input"
              name="bidAmount"
              onChange={handleChange}
              required
            />

            <label>Timeline(in days)</label>
            <input
              className="freelancer-input"
              name="timeline"
              onChange={handleChange}
              required
            />

            <label>Cover Message</label>
            <textarea
              className="freelancer-input"
              name="coverMessage"
              onChange={handleChange}
              required
            />

            <button className="neon-btn">
              Submit Proposal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}