import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const StatusToggle = () => {
  const [status, setStatus] = useState("Available");
  const workerId = localStorage.getItem("wid");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/worker/status/${workerId}`);
        setStatus(res.data.status);
      } catch (error) {
        console.error("Error fetching status");
      }
    };
    fetchStatus();
  }, [workerId]);

  const toggleStatus = async () => {
    const newStatus = status === "Available" ? "Not Available" : "Available";
    try {
      await axios.put(`${baseUrl}/api/worker/status`, { workerId, status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating status");
    }
  };

  return (
    <div>
      <h3>Status: {status}</h3>
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );
};

export default StatusToggle;
