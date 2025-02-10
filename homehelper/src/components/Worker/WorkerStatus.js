import { useState, useEffect } from "react";
import axios from "axios";

const WorkerStatus = () => {
  const [status, setStatus] = useState("Available");
  const workerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workers/status/${workerId}`);
        setStatus(res.data.status);
      } catch (error) {
        console.error("Error fetching worker status", error);
      }
    };
    fetchStatus();
  }, [workerId]);

  return (
    <div>
      <h3>Current Status: {status}</h3>
    </div>
  );
};

export default WorkerStatus;
