import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const { data } = await axios.post(
          "http://localhost:5050/api/users/login",
          {
            email: loginMethod === "email" ? email : phone,
            password,
          }
        );

        localStorage.setItem("user", JSON.stringify(data));
        alert("Login successful 🎉");
        navigate("/");

      } else {
        // REGISTER
        const { data } = await axios.post(
          "http://localhost:5050/api/users/register",
          {
            name,
            email,
            password,
          }
        );

        localStorage.setItem("user", JSON.stringify(data));
        alert("Account created 🎉");
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (


    <div style={wrapperStyle}>
      <button style={backButton} onClick={() => navigate(-1)}>
        ←
      </button>
      <div style={cardStyle}>

        {/* Sign In / Sign Up Toggle */}
        <div style={tabContainer}>
          <button
            style={isLogin ? activeTab : tabStyle}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            style={!isLogin ? activeTab : tabStyle}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <h2 style={{ marginBottom: "20px" }}>
          {isLogin ? "Welcome Back ✨" : "Create Account 🧶"}
        </h2>

        {/* Login Method Switch (Only for Sign In) */}
        {isLogin && (
          <div style={methodContainer}>
            <button
              style={loginMethod === "email" ? activeMethod : methodStyle}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </button>
            <button
              style={loginMethod === "phone" ? activeMethod : methodStyle}
              onClick={() => setLoginMethod("phone")}
            >
              Phone
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name only for Sign Up */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* Email OR Phone Input */}
          {loginMethod === "email" ? (
            <input
              type="email"
              placeholder="Email Address"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <input
              type="tel"
              placeholder="Phone Number"
              style={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={buttonStyle}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleMode} style={linkStyle}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>

      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const wrapperStyle = {
  minHeight: "90vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
  padding: "20px"
};

const cardStyle = {
  width: "400px",
  padding: "40px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  textAlign: "center",
  color: "#fff"
};

const tabContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "25px",
  background: "rgba(255,255,255,0.2)",
  borderRadius: "20px",
  padding: "5px"
};

const tabStyle = {
  flex: 1,
  padding: "8px",
  borderRadius: "20px",
  border: "none",
  background: "transparent",
  color: "#fff",
  cursor: "pointer"
};

const activeTab = {
  ...tabStyle,
  background: "#fff",
  color: "#ff4f81",
  fontWeight: "bold"
};

const methodContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const methodStyle = {
  flex: 1,
  padding: "8px",
  borderRadius: "15px",
  border: "1px solid #fff",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
  marginRight: "5px"
};

const activeMethod = {
  ...methodStyle,
  background: "#fff",
  color: "#ff4f81",
  fontWeight: "bold"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  backgroundColor: "#ff4f81",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
};

const linkStyle = {
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const backButton = {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "none",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  color: "#fff"
};


export default Login;