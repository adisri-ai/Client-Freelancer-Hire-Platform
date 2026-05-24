import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import "../../freelancer.css";
import api from "../../api.js";
const MOCK_MODE = true;
export default function Skills() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if(MOCK_MODE){
          setSkills([
        { name: "React", verified: true },
        { name: "Node.js", verified: false },
        { name: "Python", verified: false }
      ]);
      return;
    }
    if (!user) {
      navigate("/signin");
      return;
    }

    fetchSkills();
  }, [user]);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "https://api.randomurl.com/api/freelancer/skills"
      );
      setSkills(res.data);
    } catch {
      setSkills([]);
    }
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">Skill Matrix</h2>

        <div style={{ marginTop: 30 }}>
          {skills.map((skill, i) => (
            <div key={i} style={skillBlock}>
              <h3>
                {skill.name}
                {skill.verified && (
                  <span style={{ color: "#00ff88", marginLeft: 10 }}>
                    ✔ Verified
                  </span>
                )}
              </h3>

              {!skill.verified && (
                <button
                  className="neon-btn"
                  onClick={() =>
                    navigate(`/freelancer/skills/test/${skill.name}`)
                  }
                >
                  Take Test
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const skillBlock = {
  padding: 20,
  border: "1px solid #00f5ff44",
  borderRadius: 10,
  marginBottom: 20
};