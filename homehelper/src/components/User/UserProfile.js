import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaSave, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./UserNavbar";
export default function UserProfile() {
 
  const [user, setUser] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const id= localStorage.getItem("userid");

  useEffect(() => {
    fetch(`https://localhost:44345/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://localhost:44345/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert("Profile Updated Successfully !");
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating user profile:", err));
  };

  return (
    <>
     <UserNavbar/>

      {/* Profile Section */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="card shadow p-4 rounded" style={{ width: "400px", backgroundColor: "#fff" }}>
          
          {/* Profile Icon */}
          <div className="text-center">
            <FaUser className="text-success display-3 mb-3" />
            <h2 className="text-success">User Profile</h2>
          </div>

          {/* Form Inputs */}
          <form>
            {["name", "mobileNo", "email", "address"].map((field, index) => (
              <div className="mb-3" key={index}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={user[field]}
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
