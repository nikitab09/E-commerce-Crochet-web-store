import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);

    // Later connect to backend API here
    // Example:
    // await API.post("/users/register", formData);
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Create Account 🧶</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account? Login instead.
        </p>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const wrapperStyle = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #fdf6f9, #ffe6ef)",
  padding: "40px",
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "15px",
  width: "350px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#ff6f91",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

export default Register;