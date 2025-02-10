import { CheckCircle, ShieldCheck, DollarSign, Users, CalendarCheck, Scale, Headphones, ThumbsUp } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from "../components/User/Navbar";

import { Carousel } from "react-bootstrap";

export default function HomeHelperHomePage() {
  return (
    <>
      <Navbar />
      <div className="min-vh-100 bg-light p-5">
        {/* Header Section */}
        <header className="text-center py-5 text-white rounded shadow-lg"
  style={{
    background: "linear-gradient(135deg, rgb(0, 128, 128), rgb(0, 100, 100))", // Teal gradient
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
  }}
>
  <h1 className="display-4 fw-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
    Welcome to HomeHelper
  </h1>
  <p className="lead mt-2" style={{ fontSize: "1.25rem", opacity: 0.9 }}>
    Your Trusted Home Service Partner
  </p>
</header>


        {/* Features Section */}
        <section className="mt-5 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <FeatureCard
            icon={<CheckCircle size={40} className="text-success" />}
            title="Verified Professionals"
            description="All workers are background-verified and skilled."
          />
          <FeatureCard
            icon={<ShieldCheck size={40} className="text-info" />}
            title="Secure Payments"
            description="Safe and easy online payment options."
          />
          <FeatureCard
            icon={<DollarSign size={40} className="text-warning" />}
            title="Affordable Pricing"
            description="Best services at the most competitive rates."
          />
          <FeatureCard
            icon={<Users size={40} className="text-danger" />}
            title="Wide Range of Services"
            description="From cleaning to plumbing, we cover it all."
          />
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-5 container">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <h2 className="h3 fw-bold text-dark">🚀 Why Choose HomeHelper?</h2>
            <p className="text-muted mt-3">
              We provide hassle-free and reliable home services with expert workers.
            </p>

            <div className="row mt-4 d-flex justify-content-center">
              <WhyChooseCard
                icon={<CalendarCheck size={40} className="text-primary" />}
                title="Easy Booking Process"
                description="Book a service in just a few clicks."
              />
              <WhyChooseCard
                icon={<Scale size={40} className="text-success" />}
                title="Transparent Pricing"
                description="No hidden charges, full cost clarity."
              />
              <WhyChooseCard
                icon={<Headphones size={40} className="text-warning" />}
                title="24/7 Customer Support"
                description="We are always here to help you."
              />
              <WhyChooseCard
                icon={<ThumbsUp size={40} className="text-danger" />}
                title="100% Satisfaction Guarantee"
                description="Quality services you can trust."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-5 text-center">
          <h2 className="h4 fw-bold text-dark">Ready to Book a Service?</h2>
          <p className="text-muted mt-2">Experience the best home services today!</p>
          <Link to="/signup">
            <button className="mt-4 btn btn-primary btn-lg rounded-pill shadow-sm">
              Get Started
            </button>
          </Link>
        </section>

        {/* Testimonials Section (Updated with Carousel) */}
        <section className="mt-5 bg-light p-4 rounded shadow-lg text-center">
          <h2 className="h3 fw-bold text-dark">What Our Users Say</h2>
          <div className="mt-4">
            <TestimonialsCarousel />
          </div>
        </section>
      </div>
    </>
  );
}

// Testimonials Carousel Component
function TestimonialsCarousel() {
  const testimonials = [
    { name: "Rahul Sharma", feedback: "HomeHelper made my life so easy! The booking was smooth and the worker was highly professional." },
    { name: "Priya Mehta", feedback: "Best service ever! The pricing is clear, and the support team is amazing!" },
    { name: "Amit Verma", feedback: "Superb service! I booked a cleaner and was impressed with the professionalism." },
    { name: "Neha Singh", feedback: "Highly recommend HomeHelper! The plumber was skilled and fixed everything perfectly." },
    { name: "Rohan Das", feedback: "Fast and reliable! The electrician came on time and resolved my issues quickly." },
    { name: "Simran Kaur", feedback: "Very satisfied! The workers are polite and do their job perfectly!" }
  ];

  return (
    <Carousel indicators={false} controls={false} interval={2000} className="w-75 mx-auto">
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <Testimonial name={testimonial.name} feedback={testimonial.feedback} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm text-center">
      <div className="d-flex justify-content-center">{icon}</div>
      <h3 className="h5 fw-bold mt-3">{title}</h3>
      <p className="text-muted mt-2">{description}</p>
    </div>
  );
}

// Why Choose Us Card Component
function WhyChooseCard({ icon, title, description }) {
  return (
    <div className="col-md-5 m-3 p-3 border rounded shadow-sm d-flex align-items-center bg-light">
      <div className="me-3">{icon}</div>
      <div>
        <h5 className="mb-1 fw-bold">{title}</h5>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </div>
  );
}

// Testimonial Card Component
function Testimonial({ name, feedback }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm text-center mb-4 max-w-sm mx-auto">
      <p className="text-muted fst-italic">"{feedback}"</p>
      <h4 className="mt-3 fw-bold">- {name}</h4>
    </div>
  );
}
