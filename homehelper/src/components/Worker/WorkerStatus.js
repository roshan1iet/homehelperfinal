import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const WorkerStatus = () => {
  const [status, setStatus] = useState("Available");
  const workerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/workers/status/${workerId}`);
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
