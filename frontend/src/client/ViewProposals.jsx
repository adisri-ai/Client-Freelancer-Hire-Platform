import { useState, useEffect } from "react";
import axios from "axios";
import ClientNavbar from "../../components/ClientNavbar";
import NeuralBackground from "../../components/NeuralBackground";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../../freelancer.css";
import api from "../../api.js";
export default function ViewProposals() {
  const MOCK_MODE = true;
  const { user } = useContext(AuthContext);
  const [proposals, setProposals] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (MOCK_MODE) {
      setProposals([
        {
          projectId: "P101",
          title: "AI Dashboard",
          freelancerEmail: "john@mail.com",
          freelancerName: "John Doe",
          bidAmount: 2500,
          timeline: "2 Weeks",
          cover: "I have 5 years experience."
        }
      ]);

      return;
    }

    fetchProposals();
  }, []);
  useEffect(() => {
    if(MOCK_MODE==true){
      return;
    }
    if (!user || user.role !== "Client") {
      navigate("/signin");
    }
  }, [user]);

  const fetchProposals = async () => {
    const res = await api.get(
      `/api/marketplace/requests/${projectId}/proposals`
    );

    setProposals(res.data);
  };

  return (
    <>
      <NeuralBackground />
      <ClientNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">
          Received Proposals
        </h2>

        {proposals.map((p, i) => (
          <div key={i} className="freelancer-card">
            <h3>{p.proposal_id}</h3>

            <p><strong>Project ID:</strong> {p.project_id}</p>
            <p><strong>Freelancer:</strong> {p.freelancer_id}</p>
            <p><strong>Status: </strong>{p.status}</p>
            <button
              className="neon-btn"
              onClick={() => setSelected(p)}
            >
              View Details
            </button>
          </div>
        ))}

        {selected && (
          <div
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <div className="modal-card">
              <h3>{selected.proposal_id}</h3>

              <p><strong>Bid Amount:</strong> ${selected.bid_amount}</p>
              <p><strong>Timeline:</strong> {selected.estimated_days}</p>
              <p><strong>Cover Letter:</strong> {selected.cover_letters}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}