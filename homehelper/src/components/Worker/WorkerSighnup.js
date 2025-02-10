import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const WorkerSignup = () => {
    const navigate = useNavigate();
    const [worker, setWorker] = useState({
        name: '',
        mobileNo: '',
        email: '',
        password: '',
        experience: '',
       
        language: '',
        gender: '',
        aadhaarDetails: '',
        profession: '',
        status: 'Available',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    };

   

    const validateForm = () => {
        const { name, mobileNo, email, password, experience, language, gender, aadhaarDetails, profession } = worker;
        if (!name || !mobileNo || !email || !password || !experience || !language || !gender || !aadhaarDetails || !profession) {
            setError('All fields are required.');
            return false;
        }
        if (!/^\d{10}$/.test(mobileNo)) {
            setError('Mobile number must be 10 digits.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return false;
        }
        if(aadhaarDetails.length < 12)
        {
            setError('Aadhar must be at least 12 digits')
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) return; // Stop submission if validation fails

        const response = await fetch('https://localhost:44345/api/workers/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(worker)
        });
       
        // console.log(response.data);
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("wid", data.workerId);

            alert('Worker registered successfully');
            navigate('/workerdashboard');
        } else {
            setError(data.message || 'Something went wrong');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Worker Signup</h2>
                {error && <p style={styles.errorText}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="name" placeholder="Name" value={worker.name} onChange={handleChange} required style={styles.input} />
                    <input type="text" name="mobileNo" placeholder="Mobile No" value={worker.mobileNo} onChange={handleChange} required style={styles.input} />
                    <input type="email" name="email" placeholder="Email" value={worker.email} onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" value={worker.password} onChange={handleChange} required style={styles.input} />
                    <input type="text" name="experience" placeholder="Experience" value={worker.experience} onChange={handleChange} required style={styles.input} />
                    <input type="text" name="language" placeholder="Language" value={worker.language} onChange={handleChange} required style={styles.input} />
                    <select name="gender" value={worker.gender} onChange={handleChange} required style={styles.input}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select name="profession" value={worker.profession} onChange={handleChange} required style={styles.input}>
                        <option value="">Select Profession</option>
                        <option value="Sweeping">Sweeping</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Babysitter">Babysitter</option>
                        <option value="Patient Care">Patient Care</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Pet Care">Pet Care</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Haircut">Haircut</option>
                    </select>
                    <input type="text" name="aadhaarDetails" placeholder="Aadhaar Details" value={worker.aadhaarDetails} onChange={handleChange} required style={styles.input} />
                    <button type="submit" style={styles.button}>
    <Link to="/workerlogin" style={{ textDecoration: "none", color: "white" }}>Signup</Link>
</button>
                </form>
                <p style={styles.loginText}>
                    Already have an account? <Link to="/workerlogin" style={styles.loginLink}>Login</Link>
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
        minHeight: "100vh",
        backgroundColor: "#e0f7fa",
        padding: "20px",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center",
    },
    heading: {
        marginBottom: "15px",
        color: "#004d40",
        fontWeight: "bold",
    },
    errorText: {
        color: "#d32f2f",
        fontSize: "14px",
        marginBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #00796b",
        backgroundColor: "#ffffff",
        outline: "none",
    },
    button: {
        backgroundColor: "#00796b",
        border: "none",
        borderRadius: "8px",
        padding: "10px",
        fontSize: "16px",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
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

export default WorkerSignup;
