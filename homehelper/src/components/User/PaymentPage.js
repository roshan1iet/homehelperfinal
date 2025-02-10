import React from "react";
import axios from "axios";

const PaymentPage = ({ bookingId, workerId, address, mobile }) => {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("username");

  console.log("Props in PaymentPage:", { bookingId, workerId, address, mobile, userId, userName });

  const handlePayment = async () => {
    console.log("Payment button clicked");
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded!");
      return;
    }
  
    console.log("Creating Razorpay instance...");
  
    const amount = 500;
  
    const options = {
      key: "rzp_test_LMZHnNT5VlTSU1",
      amount: amount * 100,
      currency: "INR",
      name: "HomeHelper",
      description: "Payment for Service Booking",
      handler: async (response) => {
        console.log("Razorpay Response:", response);
        
        const paymentData = {
          userId: userId,
          workerId: workerId,
          paymentId: response.razorpay_payment_id,
          amount: amount,
          paymentDate: new Date().toISOString()
        };

        try {
          await axios.post("https://localhost:44345/api/payments", paymentData);
          alert("Payment Successful and Saved to Database");
        } catch (error) {
          console.error("Error saving payment:", error);
          alert("Payment Successful but Failed to Save to Database");
        }
      },
      prefill: {
        name: userName || "Test User",
        email: "test@example.com",
        contact: mobile,
      },
      theme: {
        color: "#F37254",
      },
    };
  
    console.log("Options:", options);
  
    try {
      const razorpay = new window.Razorpay(options);
      console.log("Opening Razorpay...");
      razorpay.open();
    } catch (error) {
      console.log("Error in Razorpay:", error);
    }
  };
  
  return (
    <div>
      <h2>Complete Payment</h2>
      <p>Amount: ₹500</p>
      <button onClick={handlePayment} className="bg-blue-600 text-white py-2 px-4 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
