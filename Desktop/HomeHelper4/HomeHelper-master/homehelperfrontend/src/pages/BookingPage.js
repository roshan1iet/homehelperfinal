import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingPage.css";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const [selectedLocation, setSelectedLocation] = useState("Pune");
  const [selectedService, setSelectedService] = useState("Cleaning");
  const [selectedWorker, setSelectedWorker] = useState("Helper 1");

  const timeSlots = ["08:00", "08:45", "09:30", "10:15", "11:00"];

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.name.match(/^[A-Za-z ]+$/)) {
      newErrors.name = "Name should only contain letters and spaces";
    }
    
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    
    if (formData.description.length > 200) {
      newErrors.description = "Description should not exceed 200 characters";
    }
    
    if (!selectedDate) {
      newErrors.date = "Please select a valid date";
    }
    
    if (!selectedTime) {
      newErrors.time = "Please select a time slot";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bookingData = {
        selectedDate,
        selectedTime,
        formData,
        selectedLocation,
        selectedService,
        selectedWorker,
      };
  
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });
  
        if (response.ok) {
          alert("Booking Submitted! The worker has been notified.");
        } else {
          alert("Failed to submit booking. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };
// =====================================  

return (
  <div className="booking-page" style={{ paddingTop: "100px" }}> {/* Added inline padding */}
    <br></br><h2>Book an Appointment</h2><br></br><br></br>
    <div className="form-section">
      <div className="dropdowns">
        <label>
          Location
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </label>
        <label>
          Service
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="Cleaning">Cleaning</option>
            <option value="Cooking">Cooking</option>
            <option value="Gardening">Gardening</option>
            <option value="Babysitting">Babysitting</option>
            <option value="Patient Care">Patient Care</option>
            <option value="Pet Care">Pet Care</option>
          </select>
        </label>
        <label>
          Worker
          <select value={selectedWorker} onChange={(e) => setSelectedWorker(e.target.value)}>
            <option value="Helper 1">Helper 1</option>
            <option value="Helper 2">Helper 2</option>
          </select>
        </label>
      </div>
      <div className="calendar-section">
        <label>
          Select Date
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline />
        </label>
      </div>
      <div className="time-slots">
        <h4>Select Time</h4>
        <div className="slots">
          {timeSlots.map((time) => (
            <button key={time} className={selectedTime === time ? "selected" : ""} onClick={() => setSelectedTime(time)}>
              {time}
            </button>
          ))}
        </div>
        {errors.time && <p className="error">{errors.time}</p>}
      </div>
    </div>
    <form className="personal-info" onSubmit={handleSubmit}>
    <br></br><h3>Personal Information</h3><br></br>
      <label>
        Email
        <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>
      <label>
        Name
        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>
      <label>
        Phone
        <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </label>
      <label>
        Description
        <textarea name="description" value={formData.description} onChange={handleFormChange} />
        {errors.description && <p className="error">{errors.description}</p>}
      </label><br></br>
      <button type="submit">Book Appointment</button>
    </form><br></br>
    <br></br>
  </div>
);

};

export default BookingPage;
