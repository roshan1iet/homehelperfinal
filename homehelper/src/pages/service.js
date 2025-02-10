import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaBroom, FaUtensils, FaLeaf, FaBaby, FaUserNurse, FaPaw } from "react-icons/fa"; 
import './Service.css'; // Ensure you have appropriate styling

const ServiceComponent = () => {
    const navigate = useNavigate();

    // Services Data with Icons
    const services = [
        { id: "cleaning", icon: <FaBroom />, title: "Cleaning", desc: "Professional cleaning services for your home or office, ensuring a spotless environment." },
        { id: "cooking", icon: <FaUtensils />, title: "Cooking", desc: "Delicious home-cooked meals prepared by experienced chefs tailored to your dietary needs." },
        { id: "gardening", icon: <FaLeaf />, title: "Gardening", desc: "Expert gardening services to maintain and beautify your outdoor spaces." },
        { id: "babysitting", icon: <FaBaby />, title: "Babysitting", desc: "Reliable babysitting services with trained caregivers to ensure your child's safety and happiness." },
        { id: "patient-care", icon: <FaUserNurse />, title: "Patient Care", desc: "Compassionate patient care services for the elderly or those in need of assistance at home." },
        { id: "pet-care", icon: <FaPaw />, title: "Pet Care", desc: "Professional pet care services including walking, grooming, and sitting for your furry friends." }
    ];

    return (
        <section id="Services" className="services-section">
            <h2 className="section-title">Our Services</h2>
            <div className="services-container">
                {services.map((service) => (
                    <div className="service-card" key={service.id}>
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.desc}</p>
                        <button
                            className="explore-button"
                            onClick={() => navigate(`/${service.id}`)}
                        >
                            Explore
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceComponent;

/* CSS Styles */
import './Service.css';

.service-icon {
    font-size: 3rem; /* Adjust size as needed */
    color: teal; /* Match your theme */
    margin-bottom: 10px;
}
