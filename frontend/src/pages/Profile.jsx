import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div style={container}>

      <div style={card}>

        <h2>👤 My Profile</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

        <div style={{marginTop:"20px"}}>

          <button
            style={button}
            onClick={() => navigate("/my-orders")}
          >
            📦 My Orders
          </button>

          <button
            style={{...button, background:"#ff4d4d"}}
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

const container = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "350px"
};

const button = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "none",
  borderRadius: "8px",
  background: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

export default Profile;