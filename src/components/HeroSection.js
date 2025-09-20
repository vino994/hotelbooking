import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HeroSection.css";

import banner1 from "../assets/h19.webp";
import banner2 from "../assets/h20.jpg";
import banner3 from "../assets/h21.jpg";

// Import gallery images h1–h15
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import h5 from "../assets/h5.jpg";
import h6 from "../assets/h6.jpg";
import h7 from "../assets/h7.jpg";
import h8 from "../assets/h8.jpg";
import h9 from "../assets/h9.jpg";
import h10 from "../assets/h10.jpg";
import h11 from "../assets/h11.jpg";
import h12 from "../assets/h12.jpg";
import h13 from "../assets/h13.jpg";
import h14 from "../assets/h14.jpg";
import h15 from "../assets/h15.jpg";

const banners = [banner1, banner2, banner3];
const galleryImages = [
  h1, h2, h3, h4, h5, h6, h7, h8, h9, h10,
  h11, h12, h13, h14, h15,
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Gallery & booking modal state
  const [showGallery, setShowGallery] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Booking states
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  // Store confirmed bookings
  const [bookings, setBookings] = useState([]);

  // Auto slide hero banners
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Nights & price calculation
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };
  const nights = calculateNights();
  const pricePerNight = 100;
  const totalPrice = nights * pricePerNight;

  // Confirm booking
  const handleConfirmBooking = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert("⚠️ Please select valid check-in and check-out dates.");
      return;
    }
    const newBooking = {
      img: selectedImage,
      checkIn: checkIn.toDateString(),
      checkOut: checkOut.toDateString(),
      guests,
      nights,
      totalPrice,
    };
    setBookings([...bookings, newBooking]);
    setShowBooking(false);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="hero-section text-white">
        {banners.map((img, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className="overlay"></div>

        <div className="hero-content text-center">
          <h1 className="display-3 fw-bold fade-in">EliteStay Hotel</h1>
          <p className="lead mb-4 fade-in delay-1s">
            Premium comfort & luxury resort vibes
          </p>
          <Button
            variant="warning"
            size="lg"
            className="book-btn fade-in delay-2s"
            onClick={() => setShowGallery(true)}
          >
            Discover More
          </Button>
        </div>
      </section>

      {/* GALLERY MODAL */}
      <Modal
        show={showGallery}
        onHide={() => setShowGallery(false)}
        size="xl"
        centered
        className="gallery-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Our Beautiful Spaces</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="masonry-gallery">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="gallery-item">
                <img src={img} alt={`Room ${idx + 1}`} className="img-fluid" />
                <Button
                  variant="dark"
                  className="gallery-book-btn"
                  onClick={() => {
                    setSelectedImage(img);
                    setShowBooking(true);
                  }}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* BOOKING MODAL */}
      <Modal
        show={showBooking}
        onHide={() => setShowBooking(false)}
        centered
        size="md"
        className="booking-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Your Stay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected room"
              className="img-fluid rounded mb-3"
            />
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Check-in Date</Form.Label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  setCheckIn(date);
                  if (!checkOut || date >= checkOut) {
                    const nextDay = new Date(date);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setCheckOut(nextDay);
                  }
                }}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={new Date()}
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Check-out Date</Form.Label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn || new Date()}
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Guests</Form.Label>
              <Form.Select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </Form.Select>
            </Form.Group>

            {nights > 0 && (
              <div className="price-box p-3 rounded bg-light border">
                <p>
                  <strong>{nights}</strong> Night(s)
                </p>
                <p>
                  Total Price: <strong>${totalPrice}</strong>
                </p>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBooking(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MY BOOKINGS SECTION */}
      {bookings.length > 0 && (
        <section className="my-bookings py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">My Bookings</h2>
            <div className="row">
              {bookings.map((b, i) => (
                <div key={i} className="col-md-4 mb-3">
                  <div className="card shadow-sm h-100">
                    <img
                      src={b.img}
                      alt="Booked room"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <p><strong>Check-in:</strong> {b.checkIn}</p>
                      <p><strong>Check-out:</strong> {b.checkOut}</p>
                      <p><strong>Guests:</strong> {b.guests}</p>
                      <p><strong>Nights:</strong> {b.nights}</p>
                      <p><strong>Total:</strong> ${b.totalPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
