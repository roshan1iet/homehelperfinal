import { useState, useEffect } from "react";
import axios from "axios";

const AvailableWorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    mobile: "",
    dateTime: "", // ✅ Added DateTime field
  });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get("https://localhost:44345/api/workers/available");
        setWorkers(res.data);
      } catch (error) {
        console.error("Error fetching workers", error);
      }
    };
    fetchWorkers();
  }, []);

  const handleBook = (worker) => {
    setSelectedWorker(worker);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded!");
      return;
    }
  
    const userId = localStorage.getItem("userid");
    const userName = localStorage.getItem("name");
  
    try {
      // Step 1: Make sure booking is created successfully
      const bookingRes = await axios.post("https://localhost:44345/api/bookings/create", {
        userId,
        workerId: selectedWorker.id,
        address: formData.address,
        mobile: formData.mobile,
        dateTime: formData.dateTime,
      });
  
      // If booking failed, show error and do not proceed
      if (!bookingRes.data.bookingId) {
        alert("Booking failed! Please try again.");
        return;
      }
  
      const bookingId = bookingRes.data.bookingId;
      console.log("Booking Confirmed:", bookingRes.data);
  
      // Step 2: Payment setup with Razorpay
      const options = {
        key: "rzp_test_LMZHnNT5VlTSU1",
        amount: 500 * 100, // in paise (500 INR)
        currency: "INR",
        name: "HomeHelper",
        description: "Payment for Service Booking",
        handler: async (response) => {
          console.log("Payment Success:", response);
  
          const paymentPayload = {
            id: 0,
            userId: Number(userId),
            workerId: selectedWorker.id,
            userName: userName || "Unknown User",
            userMobile: formData.mobile,
            userAddress: formData.address,
            paymentId: response.razorpay_payment_id || "N/A",
            status: "success",
            amount: 500,
            bookingId: bookingId, // Associate the payment with bookingId
          };
  
          try {
            const paymentRes = await axios.post("https://localhost:44345/api/payments/process", paymentPayload);
            if (paymentRes.data.success) {
              alert("Payment successful!");
              window.location.href = "/user-dashboard";
            }
          } catch (error) {
            console.error("Payment Save Error:", error);
            alert("Payment failed to save in database!");
          }
        },
        prefill: {
          name: userName || "Customer Name",
          email: "customer@example.com",
          contact: formData.mobile || "9999999999",
        },
        theme: { color: "#00796b" },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking failed!");
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Available Workers</h2>
        {workers.length === 0 ? (
          <p style={styles.text}>No workers available</p>
        ) : (
          <ul style={styles.workerList}>
            {workers.map((worker) => (
              <li key={worker.id} style={styles.workerCard}>
                <div style={styles.workerInfo}>
                  <h3 style={styles.workerName}>{worker.name}</h3>
                  <p style={styles.text}><strong>Experience:</strong> {worker.experience} years</p>
                  <p style={styles.text}><strong>Skills:</strong> {worker.skills}</p>
                  <p style={styles.text}><strong>Language:</strong> {worker.language}</p>
                  <p style={styles.text}><strong>Gender:</strong> {worker.gender}</p>
                </div>
                <button style={styles.button} onClick={() => handleBook(worker)}>Book</button>
              </li>
            ))}
          </ul>
        )}

        {selectedWorker && (
          <div style={styles.bookingForm}>
            <h3 style={styles.heading}>Book {selectedWorker.name}</h3>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Your Mobile No."
              onChange={handleChange}
              required
              style={styles.input}
            />

            {/* ✅ Date-Time Picker Added */}
            <label style={styles.label}>Select Date & Time:</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button style={styles.button} onClick={handlePayment}>Pay Now</button>
          </div>
        )}
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
    maxWidth: "700px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "15px",
    color: "#004d40",
    fontWeight: "bold",
  },
  text: {
    color: "#00695c",
    fontSize: "16px",
    marginBottom: "5px",
  },
  workerList: {
    listStyle: "none",
    padding: 0,
  },
  workerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#e0f2f1",
  },
  workerInfo: {
    textAlign: "left",
  },
  workerName: {
    fontWeight: "bold",
    color: "#004d40",
  },
  button: {
    backgroundColor: "#00796b",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "16px",
    color: "white",
    width: "150px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  bookingForm: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#e0f2f1",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #00796b",
    backgroundColor: "#ffffff",
    outline: "none",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#004d40",
  },
};

export default AvailableWorkersList;
