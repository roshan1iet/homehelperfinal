import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 👈 Import Link for navigation
import { useNavigate } from "react-router-dom";
const SignupFormUser = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:44345/api/users/signup", formData);
      setSuccess(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Error signing up.");
      setSuccess("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>User Signup</h2>
        {error && <p style={styles.validationMessage}>{error}</p>}
        {success && <p style={{ ...styles.validationMessage, color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile number"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
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
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button 
      type="submit" 
      style={styles.button} 
      onClick={() => navigate("/login")} // Redirect on click
    >
      Signup
    </button>
        </form>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login</Link>
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
    backgroundColor: "#e0f7fa",
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
    color: "#004d40",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  formLabel: {
    fontWeight: "bold",
    display: "block",
    color: "#00695c",
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
    padding: "16px",
    fontSize: "16px",
    color: "white",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  validationMessage: {
    fontSize: "14px",
    color: "red",
    marginBottom: "10px",
  },
  loginText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#004d40",
  },
  loginLink: {
    color: "#00796b",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default SignupFormUser;
