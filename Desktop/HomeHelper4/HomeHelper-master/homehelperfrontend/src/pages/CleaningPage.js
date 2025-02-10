import React from 'react';
import './ServicePage.css';
import { useNavigate } from 'react-router-dom';

// Import images correctly
import cleaner1 from '../assets/cleaner1.jpg';
import cleaner2 from '../assets/cleaner2.jpg';
import cleaner3 from '../assets/cleaner3.jpg';
import cleaner4 from '../assets/cleaner4.jpg';
import cleaner5 from '../assets/cleaner5.jpg';

const CleaningPage = () => {
    const navigate = useNavigate(); 

    // Use imported image variables instead of string names
    const workers = [
        { name: "John Doe", gender: "Male", experience: "5 years", location: "Delhi", salary: "₹450 / hour", img: cleaner1 },
        { name: "Jane Smith", gender: "Female", experience: "3 years", location: "Mumbai", salary: "₹460 / hour", img: cleaner2 },
        { name: "Mike Johnson", gender: "Male", experience: "4 years", location: "Bangalore", salary: "₹470 / hour", img: cleaner3 },
        { name: "Emily Davis", gender: "Female", experience: "2 years", location: "Chennai", salary: "₹440 / hour", img: cleaner4 },
        { name: "Robert Wilson", gender: "Male", experience: "6 years", location: "Kolkata", salary: "₹500 / hour", img: cleaner5 }
    ];
    
    return (
        <section className="service-page">
            <br /><br /><h2>Available Cleaning Experts</h2><br /><br />
            <div className="worker-list">
                {workers.map((worker, index) => (
                    <div className="worker-card" key={index}>
                        <img src={worker.img} alt={worker.name} />
                        <h3>{worker.name}</h3>
                        <p>Gender: {worker.gender}</p>
                        <p>Experience: {worker.experience}</p>
                    </div>
                ))}
            </div>

            {/* BOOK NOW Button */}
            <div className="book-now-container">
                <button className="book-now-button" onClick={() => navigate('/booking')}>
                    Book Now
                </button><br /><br /><br />
            </div>
        </section>
    );
};

export default CleaningPage;
