import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaSave, FaUserCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkerNavbar from "./WorkerNavbar";
export default function WorkerProfile() {
  const id= localStorage.getItem("workerId");

  const [worker, setWorker] = useState({
    name: "",
    mobileNo: "",
    email: "",
    experience: "",
    skills: "",
    language: "",
    gender: "",
    aadhaarDetails: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    fetch(`https://localhost:44345/api/workers/${id}`)
      .then((res) => res.json())
      .then((data) => setWorker(data))
      .catch((err) => console.error("Error fetching worker profile:", err));
  }, [id]);

  const handleChange = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://localhost:44345/api/workers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(worker),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating worker profile:", err));
  };

  return (
    <>
     <WorkerNavbar/>

      {/* Profile Section */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="card shadow p-4 rounded" style={{ width: "400px", backgroundColor: "#fff" }}>
          
          {/* Profile Icon */}
          <div className="text-center">
            <FaUserCog className="text-success display-3 mb-3" />
            <h2 className="text-success">Worker Profile</h2>
          </div>

          {/* Form Inputs */}
          <form>
            {["name", "mobileNo", "email", "experience", "profession", "language", "gender", "aadhaarDetails", "status"].map((field, index) => (
              <div className="mb-3" key={index}>
                <input
                  type="text"
                  name={field}
                  value={worker[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="form-control border border-success"
                />
              </div>
            ))}
          </form>

          {/* Buttons */}
          {!isEditing ? (
            <button 
              className="btn text-white w-100 mt-3" 
              style={{ backgroundColor: "#198754" }} 
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="me-2" /> Edit
            </button>
          ) : (
            <button 
              className="btn text-white w-100 mt-3" 
              style={{ backgroundColor: "#198754" }} 
              onClick={handleUpdate}
            >
              <FaSave className="me-2" /> Save
            </button>
          )}

          {/* Floating Edit Button */}
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn text-white position-absolute bottom-0 end-0 m-3 p-2 rounded-circle shadow" 
              style={{ backgroundColor: "#198754" }}
            >
              <FaEdit />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
