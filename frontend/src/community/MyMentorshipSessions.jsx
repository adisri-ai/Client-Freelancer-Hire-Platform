import { useState, useEffect, useContext } from "react";
import api from "../../api";
import FreelancerNavbar from "../../components/FreelancerNavbar,jsx";
import NeuralBackground from "../../components/NeuralBackground,jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../../freelancer.css";

export default function MyMentorshipSessions() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const MOCK_MODE = true;

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (MOCK_MODE) {
      setSessions([
        {
          id: "M1",
          title: "Master React Architecture",
          description: "Deep dive into scalable frontend systems.",
          price: "Free",
          link: "https://zoom.com/abc",
          registrations: [
            { userId: "U101", name: "John" },
            { userId: "U102", name: "Jane" }
          ]
        }
      ]);
      return;
    }

    fetchSessions();
  }, [user]);

  const fetchSessions = async () => {
    const res = await api.get(`/api/community/mentorships/user/${user.user_id}`);
    setSessions(res.data);
  };

  const handleEdit = (session) => {
    setEditing(true);
    setEditForm({ ...session });
  };

  const saveEdit = async () => {
    if (!MOCK_MODE) {
      await api.put(`/api/community/mentorships/${editForm.id}`, editForm);
    }

    setSessions((prev) =>
      prev.map((s) => (s.id === editForm.id ? { ...editForm } : s))
    );

    setEditing(false);
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">My Mentorship Sessions</h2>

        {sessions.map((s) => (
          <div key={s.id} className="freelancer-card">
            {editing && selectedSession?.id === s.id ? (
              <>
                <input
                  className="freelancer-input"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <input
                  className="freelancer-input"
                  value={editForm.link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, link: e.target.value })
                  }
                />
                <button className="neon-btn" onClick={saveEdit}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p>
                  <strong>Price:</strong> {s.price}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={s.link} target="_blank">
                    Join
                  </a>
                </p>

                <div style={{ marginTop: 15 }}>
                  <button
                    className="neon-btn"
                    onClick={() => {
                      setSelectedSession(s);
                      handleEdit(s);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="neon-btn"
                    onClick={() => setSelectedSession(s)}
                  >
                    View Registrations
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* ✅ Registrations Modal */}
        {selectedSession && !editing && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedSession(null)}
          >
            <div className="modal-card" style={{ width: 500 }}>
              <h2>Registrations</h2>

              <table className="neon-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSession.registrations.map((r, i) => (
                    <tr key={i}>
                      <td>{r.userId}</td>
                      <td>{r.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}