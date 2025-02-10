import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// import images from "../../assets/maidcart.jpg";

//import images from "../../assets/nurse.jpg"
import images from "../../assets/MaidCart.jpg"


function MaidCard() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const maid = {
    photo: `${images}`,
    name: "Priya",
    service: "Cleaning",
    experience: 5,
    location: "Delhi",
    price: 250,
  };

  const handleBookNow = () => {
    navigate("/booking"); // Redirect to BookingPage
  };

  return (
    <div className="maid-card">
      <img src={maid.photo} alt={`${maid.name}`} className="maid-photo" />
      <div className="maid-details">
        <h3>{maid.name}</h3>
        <p><strong>Service:</strong> {maid.service}</p>
        <p><strong>Experience:</strong> {maid.experience} years</p>
        <p><strong>Location:</strong> {maid.location}</p>
        <p><strong>Price:</strong> ₹{maid.price} / hour</p>
      </div>
      <button className="maid-book-btn" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
}

export default MaidCard;