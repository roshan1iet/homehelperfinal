import React from "react";
import axios from "axios";

const PaymentComponent = ({ worker }) => {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("username");

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded!");
      return;
    }

    const amount = 500; // ✅ Fix or dynamic amount

    const options = {
      key: "rzp_test_LMZHnNT5VlTSU1",
      amount: amount * 100,
      currency: "INR",
      name: "HomeHelper",
      description: "Payment for Service Booking",
      handler: async (response) => {
        console.log("Payment Success Response:", response);

        const paymentData = {
          userId: Number(userId),
          workerId: Number(worker.id),
          userName: userName || "Unknown User",
          paymentId: response.razorpay_payment_id || "N/A",
          status: "success",
          amount: amount, // ✅ Ensure backend saves amount
        };

        try {
          const res = await axios.post("https://localhost:44345/api/payments/process", paymentData);
          if (res.data.success) {
            alert("Payment successful!");
            window.location.href = "/user-dashboard";
          }
        } catch (error) {
          console.log("Payment Save Error:", error);
          alert("Payment failed to save in database!");
        }
      },
      prefill: {
        name: userName || "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md text-center">
      <h2 className="text-lg font-semibold">Complete Payment</h2>
      <p className="text-gray-600">Amount: ₹500</p>
      <button 
        onClick={handlePayment} 
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
