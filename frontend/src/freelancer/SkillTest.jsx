import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import FreelancerNavbar from "../../components/FreelancerNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import "../../freelancer.css";
export default function SkillTest() {
  const { skillName } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!user) navigate("/signin");

    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await api.post(
      `/api/ai/generate-skill-test`,
      { "skill" : skillName }
    );
    setQuestions(res.data.questions);
  };

  const submitTest = async () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct) score++;
    });

    if (score >= 3) {
      await axios.post(
        "https://api.randomurl.com/api/skills/evaluate-skill-test",
        { questions: questions, 
          user_answers : answers.values
        }
      );
      alert("✅ Test Cleared. Skill Verified!");
      navigate("/freelancer/skills");
    } else {
      alert("❌ Test Failed. Try Again.");
    }
  };

  return (
    <>
      <NeuralBackground />
      <FreelancerNavbar />

      <div className="freelancer-container">
        <h2>{skillName} Skill Test</h2>

        {questions.forEach((q) => (
          <div key={q.question_id} style={{ marginBottom: 20 }}>
            <p>{q.question_text}</p>

            {q.options.map((opt, j) => (
              <div key={j}>
                <input className="freelancer-input"
                  type="radio"
                  name={`q${q.question_id}`}
                  onChange={() =>
                    setAnswers({ ...answers, [q.question_id]: opt })
                  }
                />
                {opt}
              </div>
            ))}
          </div>
        ))}

        <button className="neon-btn" onClick={submitTest}>
          Submit Test
        </button>
      </div>
    </>
  );
}