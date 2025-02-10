import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://localhost:44345/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatus("❌ Failed to send message. Try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <h2 className="text-center mb-4 text-dark fw-bold">📩 Contact Us</h2>
        {status && <p className="text-center text-info">{status}</p>}
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-white">
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control border-2 border-success" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-control border-2 border-success" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Message</label>
            <textarea 
              name="message" 
              className="form-control border-2 border-success" 
              rows="4" 
              value={formData.message} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold shadow">
            🚀 Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
