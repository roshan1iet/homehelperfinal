import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const WorkerFooter = () => {
  return (
    <footer className="bg-success text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              We connect users with skilled workers for home services. Book professionals easily
              and hassle-free.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">Home</a>
              </li>
              <li>
                <a href="/services" className="text-white text-decoration-none">Services</a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              <FaMapMarkerAlt className="me-2" /> 123 Street, Pune
            </p>
            <p>
              <FaPhone className="me-2" /> +91 9876543210
            </p>
            <p>
              <FaEnvelope className="me-2" /> support@homehelper.com
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mt-3">
          <a href="#" className="text-white me-3">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white me-3">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0">© 2025 HomeHelper. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default WorkerFooter;
