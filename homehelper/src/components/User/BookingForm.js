import { useState } from "react";
import axios from "axios";

const BookingForm = ({ worker, onPayment }) => {
  const [formData, setFormData] = useState({
    address: "",
    mobile: "",
    dateTime: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userid") || 1;
    // const userId = Number(localStorage.getItem("userid"));
    // const userId = localStorage.getItem("userid");
    // const userIdInt = userId ? parseInt(userId, 10) : null; // ✅ String ko number me convert kar raha hu
  
    // console.log("User ID before sending:", userIdInt); // Debugging ke liye
  
    try {
      const res = await axios.post("https://localhost:44345/api/bookings/create", {
       
        workerId: worker.id,
        address: formData.address,
        mobile: formData.mobile,
      });
  
      console.log("Booking Confirmed:", res.data);
    } catch (error) {
      console.log("Booking Error:", error);
      alert("Error booking worker.");
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Book {worker.name}</h2>
      
      <input type="text" name="address" placeholder="Your Address" onChange={handleChange} required style={styles.input} />
      <input type="text" name="mobile" placeholder="Your Mobile No." onChange={handleChange} required style={styles.input} />
      
      {/* ✅ Proper Date-Time Picker */}
      <label style={styles.label}>Select Date & Time:</label>
      <input
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Pay Now</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  label: {
    fontWeight: "bold",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "teal",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default BookingForm;
