import { useEffect, useState } from "react";
import axios from "axios";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import "../../freelancer.css";

export default function ActiveContracts() {
  const [contracts, setContracts] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await axios.get(
        "https://api.randomurl.com/api/freelancer/contracts"
      );
      setContracts(res.data);
    } catch {
      // ✅ MOCK DATA
      setContracts([
        {
          projectId: "P123",
          clientId: "C001",
          title: "AI Portfolio Builder",
          timeline: ["Milestone 1", "Milestone 2", "Final Delivery"],
          bidAmount: 3000,
          description: "Develop a full AI-powered resume builder."
        }
      ]);
    }
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">Active Contracts</h2>

        {contracts.map((c, i) => (
          <div key={i} className="contract-card">
            <div>
              <h3>{c.title}</h3>
              <p><strong>Project ID:</strong> {c.projectId}</p>
              <p><strong>Client ID:</strong> {c.clientId}</p>
            </div>

            <div className="contract-buttons">
              <button
                className="neon-btn"
                onClick={() => setSelectedTimeline(c)}
              >
                View Timeline
              </button>

              <button
                className="neon-btn"
                onClick={() => setSelectedDetails(c)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {/* ✅ Timeline Modal */}
        {selectedTimeline && (
          <div className="modal-overlay" onClick={() => setSelectedTimeline(null)}>
            <div className="modal-card">
              <h3>Project Timeline</h3>
              <ul>
                {selectedTimeline.timeline.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ✅ Details Modal */}
        {selectedDetails && (
          <div className="modal-overlay" onClick={() => setSelectedDetails(null)}>
            <div className="modal-card">
              <h3>Project Details</h3>
              <p><strong>Bid Amount:</strong> ${selectedDetails.bidAmount}</p>
              <p>{selectedDetails.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}