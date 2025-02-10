import React, { useState } from 'react';
import logo from '../../assets/logo.jpg'; 
import './Navbar.css'; // Import your CSS file for styling
import { NavLink  } from 'react-router-dom';
const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
                <img src={logo} alt="Home Helper Logo" style={{ width: '55px' }} />
                {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}

                {/* <h1>HomeHelper</h1> */}
                <h1>Home Helper</h1>
          
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="#Services">Services</a></li>
            
                <NavLink to="/book" >Book</NavLink>
                
                
                <li 
                    className="dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                >
                    <a href="/login" className="dropdown-toggle">
                        Login <span className="arrow">&#x25BC;</span>
                    </a>
                    {dropdownVisible && (
                    <ul className="dropdown-menu">
                        <li><NavLink to="/loginU"> Login</NavLink></li>
                        <li><NavLink to="/loginA">AdminLogin</NavLink></li>
                    </ul>
)}
                </li>
                <li><a href="#about-us">About Us</a></li>
                <NavLink to="/contact">Contact</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;
