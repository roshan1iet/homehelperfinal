import { useState, useEffect } from "react";
import axios from "axios";

const WorkerForm = () => {
  const [formData, setFormData] = useState({
    experience: "",
    skills: "",
    language: "",
    gender: "Male",
    aadhaar_number: "",
    aadhaar_image: null,
  });

  const workerId = localStorage.getItem("id"); // Worker ID from localStorage

  useEffect(() => {
    if (!workerId) {
      alert("Please login first.");
      window.location.href = "/";
    }
  }, [workerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, aadhaar_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("workerId", workerId);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("language", formData.language);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("aadhaar_number", formData.aadhaar_number);
    formDataToSend.append("aadhaar_image", formData.aadhaar_image);

    try {
      await axios.post("http://localhost:5000/api/worker/details", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Details submitted successfully!");
      window.location.href = "/worker-dashboard";
    } catch (error) {
      alert("Error submitting details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Worker Details</h2>
      <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
      <input type="text" name="skills" placeholder="Skills" onChange={handleChange} required />
      <input type="text" name="language" placeholder="Language" onChange={handleChange} required />
      <select name="gender" onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="text" name="aadhaar_number" placeholder="Aadhaar Number" onChange={handleChange} required />
      <input type="file" name="aadhaar_image" onChange={handleFileChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkerForm;
