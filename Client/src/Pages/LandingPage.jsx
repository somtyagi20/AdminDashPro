/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Welcome to AdminDash Pro.
      </h1>
      <p>
        AdminDash Pro is a platform that allows you to manage customer details,
        purchase orders, and shipping information.
      </p>
      <Link to="/signup" className="link-text">
        Sign Up to get started!
      </Link>

      <div className="about">
        <h2>About Us</h2>
        <p>
          I am a passionate student deeply involved in various tech projects,
          driven by a curiosity to explore and innovate. With a strong interest
          in technology and its applications, I dedicate myself to learning and
          creating solutions that make a difference. As an enthusiastic learner,
          I thrive on challenges and strive for continuous improvement in my
          skills and knowledge.
        </p>
      </div>
      <div className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to me. I
          would love to hear from you!
        </p>
        <p>Email: somnathtyagi210787@acropolis.in</p>
        <p>Phone: 9174935380</p>
      </div>
      <footer className="footer">
        <p>&copy; 2024 AdminDash Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
