import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginFormUser = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:44345/api/users/login", formData);
  
      alert(`Welcome, ${response.data.name}`);
  
      localStorage.setItem("userid", response.data.id);
      localStorage.setItem("add", response.data.address);
      localStorage.setItem("mobno", response.data.mobileno);
      localStorage.setItem("name", response.data.name);
  
      console.log("Login Response:", response.data); // ✅ Pura response print karega
      console.log("UserID:", response.data.id);
      // ✅ Sirf UserID print karega
  
      navigate("/userdashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}> user Login </h2>
        {error && <p style={styles.validationMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.registerText}>
          Don't have an account? <a href="/signup" style={styles.registerLink}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e0f7fa", // Light teal background
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#004d40", // Dark teal
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  formLabel: {
    fontWeight: "bold",
    display: "block",
    color: "#00695c", // Dark teal
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #00796b",
    backgroundColor: "#e0f2f1",
    outline: "none",
  },
  button: {
    backgroundColor: "#00796b",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    color: "white",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#004d40",
  },
  validationMessage: {
    fontSize: "14px",
    color: "red",
    marginBottom: "10px",
  },
  registerText: {
    fontSize: "14px",
    marginTop: "10px",
    color: "#004d40",
  },
  registerLink: {
    color: "#00796b",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default LoginFormUser;
