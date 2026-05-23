import { useEffect, useState, useContext } from "react";
import axios from "axios";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../../freelancer.css";
const MOCK_MODE = true;
export default function PortfolioGallery() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(MOCK_MODE){
        setProjects([
          {
            title: "AI Portfolio Builder",
            description: "Built an AI-based resume builder.",
            techStack: "React, Node, GPT-4",
            link: "https://demo.com",
            images: []
          }
        ]);
        return;
    }
    if (!user) {
      navigate("/signin");
      return;
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(
      "https://api.randomurl.com/api/freelancer/portfolio"
    );
    setProjects(res.data);
  };

  const saveProjects = async () => {
    await axios.put(
      "https://api.randomurl.com/api/freelancer/portfolio/update",
      projects
    );
    setEditing(false);
  };

  const updateProject = (index, key, value) => {
    const updated = [...projects];
    updated[index][key] = value;
    setProjects(updated);
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2 className="freelancer-title">
          My Portfolio Gallery
        </h2>

        {projects.map((project, i) => (
          <div key={i} style={projectBlock}>
            <Editable
              label="Title"
              value={project.title}
              editing={editing}
              onChange={(val) =>
                updateProject(i, "title", val)
              }
            />

            <Editable
              label="Description"
              value={project.description}
              editing={editing}
              onChange={(val) =>
                updateProject(i, "description", val)
              }
            />

            <Editable
              label="Tech Stack"
              value={project.techStack}
              editing={editing}
              onChange={(val) =>
                updateProject(i, "techStack", val)
              }
            />

            <Editable
              label="Project Link"
              value={project.link}
              editing={editing}
              onChange={(val) =>
                updateProject(i, "link", val)
              }
            />

            {project.images &&
              project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  style={{ width: 150, marginRight: 10 }}
                />
              ))}
          </div>
        ))}

        {!editing ? (
          <button
            className="neon-btn"
            onClick={() => setEditing(true)}
          >
            Edit Portfolio
          </button>
        ) : (
          <button
            className="neon-btn"
            onClick={saveProjects}
          >
            Save Changes
          </button>
        )}
      </div>
    </>
  );
}

function Editable({ label, value, editing, onChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <strong>{label}:</strong>
      {editing ? (
        <input className="freelancer-input"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span> {value || "-"}</span>
      )}
    </div>
  );
}

const projectBlock = {
  padding: 20,
  border: "1px solid #00f5ff44",
  borderRadius: 10,
  marginBottom: 20
};