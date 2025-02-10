import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import WorkerDashboard from "./pages/WorkerDashboard";
// import UserDashboard from "./pages/User/UserDashboard";
import SignupFormUser from "./components/User/SignupFormUser";
import LoginFormUser from "./components/User/LoginFormUser";
import UserDashboard from "./components/User/UserDashboard";
import WorkerSignup from "./components/Worker/WorkerSighnup";
import WorkerLogin from "./components/Worker/WorkerLogin";
import './index.css'; // Agar aapne index.css file mein Tailwind set kiya hai
import WorkerDashboard from "./components/Worker/WorkerDashboard";
import WorkerProfile from "./components/Worker/WorkerProfile";
import WorkerBookings from "./components/Worker/WorkerBookings";
import UserProfile from "./components/User/UserProfile";  
import WorkerFooter from "./components/Footer";
import ContactForm from "./components/contactform";
import UserBookings from "./components/User/UserBookings";

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        <Route path="/signup" element={<SignupFormUser />} />
        {/* <Route path="/signupworker" element={<SignupFormUser />} /> */}
        <Route path="/login" element={<LoginFormUser/>} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/signupworker" element={< WorkerSignup/>} />
        <Route path="/workerlogin" element={< WorkerLogin/>} />
        <Route path="/workerdashboard" element={< WorkerDashboard/>} />
        <Route path="/workerprofile" element={< WorkerProfile/>} />
        <Route path="/workerbookings" element={< WorkerBookings/>} />
        <Route path="/userprofile" element={< UserProfile/>} />
        <Route path="/contact" element={< ContactForm/>} />
        <Route path="/services" element={< UserDashboard/>} />
        <Route path="/userbookings" element={< UserBookings/>} />
 
        {/* userdashboard */}
      </Routes>
    </Router>
    <WorkerFooter/>
    </>
  );
}

export default App;
