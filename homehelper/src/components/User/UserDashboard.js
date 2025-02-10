import React, { useState, useEffect } from "react";
import Navbar from "./UserNavbar";
import axios from "axios";
import { Button } from "react-bootstrap";

const professions = [
  { name: "Sweeping", 
    requestSent: false,
  }, 
  {name: "Cooking", requestSent: false}, 
  {name: "Babysitter", requestSent: false}, 
  {name: "Patient Care", requestSent: false}, 
  {name: "Gardening", requestSent: false},
  {name: "Pet Care", requestSent: false},
  {name: "Electrician", requestSent: false},
  {name: "Plumbing", requestSent: false},
  {name: "Hair Cut", requestSent: false},
  // "Pet Care", "Electrician", "Plumbing", "Hair Cut"
];

const UserDashboard = () => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [professionState, setProfessionState] = useState(professions);
  const [bookingDetails, setBookingDetails] = useState({
    Mobile: "",
    Address: "",
    DateTime: "",
    WorkerId: "",
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [requestSent, setRequestSent] = useState(false); // New state for "Booking Request Sent"
  const [workerStatus, setWorkerStatus] = useState({}); // Track worker's booking status

  useEffect(() => {
    if (selectedProfession) {
      fetch(`https://localhost:44345/api/workers?profession=${selectedProfession.name}`)
        .then((response) => response.json())
        .then((data) => setWorkers(data))
        .catch((error) => console.error("Error fetching workers:", error));
    }
  }, [selectedProfession]);

  useEffect(() => {
    console.log(bookingDetails)
  }, [bookingDetails])

  const handleBookingFormChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userid");
    try{
      const response = await axios.post(`https://localhost:44345/api/workers/book`, {...bookingDetails, userId});
      // Set booking request as sent
      if(response.status === 200) {
        console.log(response.data);
        const newProfession = [...professionState.map(item => ({...item, requestSent: item.name === selectedProfession.name ? true : item.requestSent}))]
        setProfessionState(newProfession);
        setShowBookingForm(false);
      }
    }
    catch (error) {
      console.log(error);
    }
    setRequestSent(true);

    // Set isBooked status to 'pending' in the workers table
    // fetch(`https://localhost:44345/api/workers/${bookingDetails.workerId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ isBooked: "pending" }),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     // Store user booking details in an object (can be used for further purposes)
    //     const bookingData = {
    //       userId: localStorage.getItem("id"), // User ID as integer
    //       workerId: bookingDetails.workerId,
    //       address: bookingDetails.address,
    //       mobile: bookingDetails.mobileNo,
    //       status: "Booked", // Default status
    //       createdAt: new Date().toISOString(), // Current timestamp
    //       scheduledAt: new Date(bookingDetails.dateTime).toISOString(), // User-selected date-time
    //     };

    //     // Call the backend API to save the booking details
    //     fetch("https://localhost:44345/api/booking", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(bookingData),
    //     })
    //       .then((res) => res.json())
    //       .then(() => {
    //         alert("Booking request sent successfully!");
    //         setWorkerStatus((prevStatus) => ({
    //           ...prevStatus,
    //           [bookingDetails.workerId]: "Request Sent", // Update worker status
    //         }));
    //       })
    //       .catch((err) => console.error("Error saving booking:", err));
    //   })
    //   .catch((err) => console.error("Error updating worker status:", err));
  };

  const handleBooking = (workerId) => {
    setBookingDetails({ ...bookingDetails, WorkerId: workerId });
    setShowBookingForm(true); // Show booking form as popup
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for time zone
    return now.toISOString().slice(0, 16); // Extracts "YYYY-MM-DDTHH:MM"
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Select a Profession</h2>

        {/* Profession Selection Cards */}
        <div style={styles.professionGrid}>
          {professionState && professionState.map((profession) => (
            <div
              key={profession.name}
              style={{
                ...styles.professionCard,
                backgroundColor: selectedProfession ? selectedProfession.name === profession.name ? "#00796b" : "#e0f7fa" : "#e0f7fa",
                color: selectedProfession ? selectedProfession.name === profession.name ? "white" : "black" : "black",
              }}
              onClick={() => {
                const exists = professionState.find(item => item.name === profession.name);
                if(exists) {
                  exists.requestSent || setSelectedProfession(profession);
                  exists.requestSent && alert('Request already sent for this profession');
                }
              }}
            >
              {profession.name}
            </div>
          ))}
        </div>

        {/* Worker List */}
        {selectedProfession && (
          <div>
            <h3 style={styles.workerHeading}>Available {selectedProfession.name} Workers</h3>
            {workers.length > 0 ? (
              <div style={styles.workerGrid}>
                {workers.map((worker) => (
                  <div key={worker.id} style={styles.workerCard}>
                    <p><strong>Name:</strong> {worker.name}</p>
                    <p><strong>Experience:</strong> {worker.experience} years</p>
                    <p><strong>Status:</strong> {workerStatus[worker.id] || worker.status}</p>
                    <p><strong>Mobile:</strong> {worker.mobileNo}</p>
                    <p><strong>Gender:</strong> {worker.gender}</p>
                    <p><strong>Profession:</strong> {worker.profession}</p>
                    <Button
                      variant="success"
                      disabled={professionState.find(item => item.name === worker.profession)?.requestSent}
                      onClick={() => {
                        if(selectedProfession.requestSent) {
                          alert('request already send for this profession');
                        }
                        else {
                          handleBooking(worker.id)
                        }
                      }}
                    >
                      {professionState.find(item => item.name === worker.profession)?.requestSent ? "Request Sent" : "Book Now"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No workers available.</p>
            )}
          </div>
        )}

        {/* Booking Form (shows as a popup) */}
        {showBookingForm && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3 style={styles.bookingHeading}>Enter Your Details</h3>
              <form onSubmit={handleBookingSubmit} style={styles.form}>
                <input
                  type="text"
                  name="Mobile"
                  placeholder="Mobile No"
                  value={bookingDetails.Mobile}
                  onChange={handleBookingFormChange}
                  required
                  style={styles.input}
                />
                <input
                  type="text"
                  name="Address"
                  placeholder="Address"
                  value={bookingDetails.Address}
                  onChange={handleBookingFormChange}
                  required
                  style={styles.input}
                />
                <input
                  type="datetime-local"
                  name="DateTime"
                  value={bookingDetails.DateTime}
                  onChange={handleBookingFormChange}
                  required
                  style={styles.input}
                  min={getMinDateTime()} // ⬅ Prevents past dates
                />
                <button type="submit" style={styles.button}>
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#004d40",
    textAlign: "center",
  },
  professionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    maxWidth: "600px",
    margin: "auto",
  },
  professionCard: {
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  workerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  workerHeading: {
    fontSize: "20px",
    color: "#00796b",
    textAlign: "center",
  },
  workerCard: {
    backgroundColor: "#00796b",
    color: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  bookButton: {
    marginTop: "10px",
    backgroundColor: "#ffffff",
    color: "#00796b",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
  },
  bookingHeading: {
    fontSize: "20px",
    color: "#004d40",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #00796b",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#00796b",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default UserDashboard;
