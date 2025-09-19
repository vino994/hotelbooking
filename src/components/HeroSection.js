import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./HeroSection.css";
import banner1 from "../assets/h4.jpg";
import banner2 from "../assets/h5.jpg";
import banner3 from "../assets/h6.jpg";

const banners = [banner1, banner2, banner3];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto slide images every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section text-white">
      {/* Background slider */}
      {banners.map((img, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Dark overlay */}
      <div className="overlay"></div>

      {/* Centered text */}
      <div className="hero-content text-center">
        <h1 className="display-3 fw-bold fade-in">EliteStay Hotel</h1>
        <p className="lead mb-4 fade-in delay-1s">
          Premium comfort & luxury resort vibes
        </p>
        <Button
          variant="warning"
          size="lg"
          className="book-btn fade-in delay-2s"
        >
          Discover More
        </Button>
      </div>
    </section>
  );
}
