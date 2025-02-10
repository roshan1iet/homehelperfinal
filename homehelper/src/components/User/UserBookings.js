import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./UserNavbar";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem("userid");
    const [run, setRun] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`https://localhost:44345/api/Booking/user-bookings/${userId}`)
                .then(response => setBookings(response.data))
                .catch(error => console.error("Error fetching bookings:", error));
        }
        console.log(bookings);
    }, [userId, run]);

    const payNow = async (booking) => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded!");
            return;
          }
        
          const userId = localStorage.getItem("userid");
          const userName = localStorage.getItem("name");
        
          try {
            // Step 1: Make sure booking is created successfully
        
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
                  userId: +userId,
                  workerId: +booking.workerId,
                  userName: userName || "Unknown User",
                  userMobile: booking.mobile,
                  userAddress: booking.address,
                  paymentId: response.razorpay_payment_id || "N/A",
                  status: "success",
                  amount: 500,
                  bookingId: 1, // Associate the payment with bookingId
                };
        
                try {
                    const paymentRes = await axios.get(`https://localhost:44345/api/payments/process/${booking.id}`, );
                    setRun((run) => run + 1);
                    alert("Payment successful!");
                } catch (error) {
                  console.error("Payment Save Error:", error);
                  alert("Payment failed to save in database!");
                }
              },
              prefill: {
                name: userName || "Customer Name",
                email: "customer@example.com",
                contact: booking.mobile || "9999999999",
              },
              theme: { color: "#00796b" },
            };
        
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } catch (error) {
            console.error("Booking Error:", error);
            alert("Booking failed!");
          }
    }

    const cancelBooking = async (booking) => {
        try{
            const response = await axios.delete(`https://localhost:44345/api/booking/${booking.id}`); 
            setRun((run) => run + 1);
        }
        catch(error)
        {
            console.error("Cancel Booking Error:", error);
        }
    }
    return (
        <>
            <Navbar />
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
                                            <strong>Profession:</strong> {booking.workerProfession} <br />
                                            <strong>Amount:</strong> ₹{500} <br />
                                            <strong>Date:</strong> {new Date(booking.scheduledAt).toLocaleDateString()} <br />
                                            <strong>Address:</strong> {booking.address} <br />
                                            <strong>Status:</strong> 
                                            <span className="fw-bold ms-2" style={{ color: "#008080" }}>
                                                {booking.status}
                                            </span>
                                        </Card.Text>
                                        {!(booking.status === 'Rejected' || booking.status === 'Closed') ? <Button variant={booking.status === 'Approved' ? 'success' : 'outline-danger'} onClick={() => {
                                            booking.status === 'Approved' ? payNow(booking) : cancelBooking(booking)
                                        }}>{ booking.status === 'Approved' ? 'Pay Now' : 'Cancel Booking'}</Button> : null}
                                        {
                                            booking.status === 'Closed' ? <>
                                            <strong>Payment Status:</strong> 
                                                <span className="fw-bold ms-2" style={{ color: "#008080" }}>
                                                    Payment SuccessFul
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
};

export default UserBookings;
