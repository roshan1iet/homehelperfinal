import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerNavbar from "./WorkerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard, FaRupeeSign } from "react-icons/fa";

const WorkerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const workerId = localStorage.getItem("workerId");

  useEffect(() => {
    if (workerId) {
      axios.get(`https://localhost:44345/api/workers/worker/${workerId}`)
        .then(response => {
          console.log("API Response:", response.data);
          setBookings(response.data);
        })
        .catch(error => console.error("Error fetching bookings:", error));
    }
  }, [workerId]);

  return (
    <>
      {/* Navbar */}
      <WorkerNavbar />

      {/* Booking List Section */}
      <div className="container mt-5">
        <h2 className="text-center text-success mb-4">📋 Your Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-muted fs-5">No bookings yet.</p>
        ) : (
          <div className="row">
            {bookings.map((booking, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow border-0 rounded-4 p-3">
                  <h5 className="text-success text-center">
                    <FaUser className="me-2" /> {booking.userName}
                  </h5>
                  <hr />

                  <p>
                    <FaPhone className="text-success me-2" />
                    <strong>Mobile:</strong> {booking.userMobile}
                  </p>
                  <p>
                    <FaMapMarkerAlt className="text-success me-2" />
                    <strong>Address:</strong> {booking.userAddress}
                  </p>
                  <p>
                    <FaCreditCard className="text-success me-2" />
                    <strong>Payment ID:</strong> {booking.paymentId}
                  </p>
                  <p className="fs-5 text-success">
                    <FaRupeeSign className="me-2" />
                    <strong>{booking.amount}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkerBookings;
