import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { motion } from "framer-motion";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import "../../freelancer.css";
import default_photo from "../../assets/defautl_photo.png";
import api from "../../api.js";
export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const MOCK_MODE = true;
  // ✅ Redirect if not authenticated
  useEffect(() => {
    if(MOCK_MODE){
      setProfile({
        bio: "Vibe Coder",
        hourlyRate: "500M/hr",
        profilePhoto: "",

        skills: [
          { name: "Vibe Coding", verified: true },
          { name: "AI Architecture", verified: false }
        ],

        education: [
          {
            institution: "Munna Bhai Institute of Technology",
            course: "MBBS in Vibe Coding",
            grade: "A+",
            year: "2025"
          }
        ],

        work: [
          {
            company: "Vibe Labs",
            role: "Chief Vibe Engineer",
            startYear: "2023",
            endYear: "Present"
          }
        ]
      });
      return;
    }
    if (!user) {
      navigate("/signin");
    } else {
      fetchProfile();
    }
  }, [user]);
  const fetchProfile = async () => {
    try {
      const res = await api.get(`/api/portfolios/${user.user_id}`)
      setProfile(res.data);
    } catch {
      console.log("Failed to fetch profile data")
      setProfile({
        bio: "",
        skills: [],
        hourlyRate: "",
        education: [],
        work: []
      });
    }
  };

  // ✅ Autosuggestion on skill typing
  const handleSkillChange = async (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      try {
        const res = await axios.get(
          `https://api.randomurl.com/api/freelancer/skills/suggest?q=${value}`
        );
        setSuggestions(res.data);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skillObj) => {
    setProfile({
      ...profile,
      skills: [...profile.skills, skillObj]
    });
    setSkillInput("");
    setSuggestions([]);
  };

  const saveProfile = async () => {
    try {
      api.put(`/api/portfolios/${user.user_id}`, portfolioData)
      setEditing(false);
    } catch {
      alert("Update Failed");
    }
  };

  if (!profile) return null;

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />
      <div style={container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glow-card"
          style={{ width: "80%", marginTop: 120 }}
        >
          <h2 style={sectionTitle}>My TalentStage Profile</h2>

          {/* ✅ Full Name derived from email */}
          {/* ✅ Profile Photo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <img
              src={profile.profilePhoto || default_photo}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #00f5ff",
                boxShadow: "0 0 20px #00f5ff55"
              }}
            />
          </div>
          <ProfileRow
            label="Full Name"
            value={user.email.split("@")[0]}
            editable={false}
          />

          <EditableField
            label="Bio"
            value={profile.bio}
            editing={editing}
            onChange={(val) => setProfile({ ...profile, bio: val })}
          />

          <EditableField
            label="Hourly Rate ($)"
            value={profile.hourlyRate}
            editing={editing}
            onChange={(val) =>
              setProfile({ ...profile, hourlyRate: val })
            }
          />

          {/* ✅ Skills */}
          <div style={{ marginTop: 20 }}>
            <h3>Skills</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {profile.skills.map((skill, i) => (
                <div key={i} style={skillBadge}>
                  {skill.name}
                  {skill.verified && (
                    <span style={verifiedBadge}>✔</span>
                  )}
                </div>
              ))}
            </div>

            {editing && (
              <>
                <input className="freelancer-input"
                  value={skillInput}
                  onChange={handleSkillChange}
                  placeholder="Add new skill..."
                />

                {suggestions.length > 0 && (
                  <div style={suggestBox}>
                    {suggestions.map((s, i) => (
                      <div
                        key={i}
                        style={suggestItem}
                        onClick={() =>
                          addSkill({ name: s.name, verified: false })
                        }
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* ✅ Education */}
          <SectionBlock
            title="Education"
            items={profile.education}
            editing={editing}
            fields={["institution", "degree", "start_year", "end_year"]}
            onChange={(newData) =>
              setProfile({ ...profile, education: newData })
            }
          />

          {/* ✅ Work Experience */}
          <SectionBlock
            title="Work Experience"
            items={profile.work}
            editing={editing}
            fields={["company", "role", "start_date", "end_date", "description"]}
            onChange={(newData) =>
              setProfile({ ...profile, work: newData })
            }
          />

          {/* ✅ Edit Button */}
          <div style={{ marginTop: 30 }}>
            {!editing ? (
              <button
                className="neon-btn"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="neon-btn"
                onClick={saveProfile}
              >
                Save Changes
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ✅ Reusable Components */

function ProfileRow({ label, value }) {
  return (
    <div style={row}>
      <strong>{label}:</strong> <span>{value}</span>
    </div>
  );
}

function EditableField({ label, value, editing, onChange }) {
  return (
    <div style={row}>
      <strong>{label}:</strong>
      {editing ? (
        <input className="freelancer-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span>{value || "-"}</span>
      )}
    </div>
  );
}

function SectionBlock({ title, items, editing, fields, onChange }) {
  const addBlock = () => {
    onChange([...items, {}]);
  };

  const updateBlock = (index, key, value) => {
    const updated = [...items];
    updated[index][key] = value;
    onChange(updated);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <h3>{title}</h3>

      {items.map((item, i) => (
        <div key={i} style={blockStyle}>
          {fields.map((field) => (
            <div key={field}>
              <strong>{field}:</strong>
              {editing ? (
                <input className="freelancer-input"
                  value={item[field] || ""}
                  onChange={(e) =>
                    updateBlock(i, field, e.target.value)
                  }
                />
              ) : (
                <span>{item[field] || "-"}</span>
              )}
            </div>
          ))}
        </div>
      ))}

      {editing && (
        <button
          className="neon-btn"
          style={{ marginTop: 10 }}
          onClick={addBlock}
        >
          + Add {title}
        </button>
      )}
    </div>
  );
}

/* ✅ Styles */

const container = {
  display: "flex",
  justifyContent: "center"
};

const sectionTitle = {
  fontFamily: "Orbitron",
  fontSize: 28,
  marginBottom: 20
};

const row = {
  marginBottom: 15
};

const skillBadge = {
  padding: "8px 14px",
  background: "linear-gradient(90deg,#00f5ff,#8b5cf6)",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  gap: 5
};

const verifiedBadge = {
  marginLeft: 5,
  color: "#00ff88"
};

const suggestBox = {
  background: "#111",
  border: "1px solid #00f5ff",
  marginTop: 5
};

const suggestItem = {
  padding: 8,
  cursor: "pointer"
};

const blockStyle = {
  marginTop: 15,
  padding: 15,
  border: "1px solid #00f5ff44",
  borderRadius: 10
};