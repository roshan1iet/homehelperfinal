// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css'; // Import the CSS file

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API)
    console.log({ name, email, phone, message });
  };

  return (
    
    <div className="contact-container"><br></br><br></br>
      <h1 className="contact-heading">Contact Us</h1><br></br><br></br>
      <blockquote className="contact-quote">
        "Your comfort is our priority. Book a maid today!"
      </blockquote><br></br><br></br>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="tel"
          placeholder="Your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="form-textarea"
        />
        <button type="submit" className="submit-button">Send Message</button><br></br>
      </form><br></br><br></br><br></br><br></br>
    </div>
  );
};

export default Contact;