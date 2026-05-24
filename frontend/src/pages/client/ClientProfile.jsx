import { useContext } from "react";
import ClientNavbar from "../../components/ClientNavbar.jsx";
import NeuralBackground from "../../components/NeuralBackground.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import default_photo from "../../assets/defautl_photo.png";
const MOCK_MODE = true;
export default function ClientProfile() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
      if(MOCK_MODE==true){
        return;
      }
      if (!user || user.role !== "Client") {
        navigate("/signin");
      }
    }, [user]);
  return (
    <>
      <NeuralBackground />
      <ClientNavbar />

      <div className="freelancer-container">
        <div className="freelancer-card">

          <div style={{ textAlign: "center" }}>
            <img
              src={default_photo}
              alt=""
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "3px solid #00f5ff"
              }}
            />
          </div>

          <h2 className="freelancer-title">
            Client Profile
          </h2>

          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </>
  );
}
