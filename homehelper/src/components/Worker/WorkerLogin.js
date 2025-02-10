import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch("https://localhost:44345/api/workers/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setError("Invalid email or password");
                return;
            }

            const data = await response.json();

            // Save workerId in localStorage
            localStorage.setItem("workerId", data.workerId);

            console.log("Logged in worker:", data);

            // Redirect to Worker Dashboard
            navigate("/workerdashboard");
        } catch (error) {
            console.error("Login failed", error);
            setError("Something went wrong. Try again!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Worker Login</h2>
                {error && <p style={styles.validationMessage}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.registerText}>
                    Don't have an account? <a href="/worker-signup" style={styles.registerLink}>Sign up</a>
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
        padding: "12px",
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

export default WorkerLogin;
