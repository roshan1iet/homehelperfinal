import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./WorkerNavbar";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function WorkerDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [run, setRun] = useState(0);
  const workerId = localStorage.getItem("workerId"); // 🔹 Replace this with actual worker ID (e.g., from localStorage or context)

  useEffect(() => {
    if(workerId) {
      const asyncFunction = async () => {
        const response = await axios.get(`https://localhost:44345/api/workers/getPendingRequests/${workerId}`);
        setBookings(response.data);
      }
      asyncFunction();
    }
    
  }, [run])
  const toggleAvailability = async () => {
    const newStatus = !isAvailable ? "Available" : "Unavailable";
    setIsAvailable(!isAvailable);


    // API call to update the worker's availability status in the database
    try {
      const response = await fetch("https://localhost:44345/api/workers/updateAvailability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, availability: newStatus })
      });

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const approveClickHandler = async(id) => {
    const response = await axios.put(`https://localhost:44345/api/workers/approve/${id}`);
    if(response.status == 200) {
      setRun((item) => item + 1);
    }
  }

  const rejectClickHandler = async(id) => {
    const response = await axios.put(`https://localhost:44345/api/workers/reject/${id}`); 
    if(response.status == 200) {
      setRun((item) => item + 1);
    }
  }

  return (
    <>
    <Navbar/>
    <Container className="mt-4">
      <h2 className="text-center text-success mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
            <p className="text-center text-muted">No bookings found.</p>
        ) : (
            <Row className="g-4">
                {bookings.map((booking, index) => (
                    <Col key={index} md={6} lg={4}>
                        <Card className="shadow border-0">
                            <Card.Body>
                                <Card.Title className="text-success fw-bold">{booking.workerName}</Card.Title>
                                <Card.Text>
                                   <strong>Name: </strong>{booking.userName}<br />
                                    <strong>Amount:</strong> ₹{500} <br />
                                    <strong>Date Time:</strong>{booking.dateTime}<br />
                                    <strong>Address: </strong> {booking.address} <br />
                                    <strong>Contact: </strong> {booking.mobile} <br />
                                    <strong>Status:</strong> 
                                    <span className="fw-bold ms-2" style={{ color: "#008080" }}>
                                        {booking.status}
                                    </span>
                                </Card.Text>
                                {booking.status === 'Pending' ? 
                                <>
                                  <Button variant="success" onClick={() => approveClickHandler(booking.id)}>Approve</Button>
                                  <Button variant="outline-danger" onClick={() => rejectClickHandler(booking.id)}>Reject</Button>
                                </> : null}
                                {
                                    booking.status === 'Closed' ? <>
                                    <strong>Payment Status:</strong> 
                                        <span className="fw-bold ms-2" style={{ color: "#008080" }}>
                                            Payment Received
                                        </span></> : null
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )}
    </Container>
    </>
  );
}

export default WorkerDashboard;
