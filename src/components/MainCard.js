import React, { useState } from "react";
import { Row, Col, Button, Form, Carousel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaUsers, FaDollarSign } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./MainCard.css";

// Sample images for carousel
import img1 from "../assets/h7.jpg";
import img2 from "../assets/h11.jpg";
import img3 from "../assets/h12.jpg";

export default function MainCard() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const pricePerNight = 120;
  const totalPrice = nights * pricePerNight;

  return (
    <section className="main-card">
      <div className="main-card-box shadow-lg">
        {/* Navbar */}
        <div className="card-navbar border-bottom py-3">
          <Row className="align-items-center text-center gy-3">
            <Col md={4} className="d-flex justify-content-center">
              <ul className="nav-list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#rooms">Our Rooms</a></li>
              </ul>
            </Col>
            <Col md={4} className="text-center">
              <h1 className="hotel-logo mb-0">EliteStay</h1>
              <p className="subtitle">Hotel & Resort</p>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <ul className="nav-list">
                <li><a href="#reservation">Reservation</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </Col>
          </Row>
        </div>

        {/* Carousel Section */}
        <div className="main-card-body text-center">
          <Carousel fade interval={4000} className="main-carousel">
            <Carousel.Item>
              <img src={img1} className="d-block w-100 main-img" alt="Hotel 1" />
              <Carousel.Caption>
                <h3>Welcome to EliteStay</h3>
                <p>Luxury & Comfort Redefined</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={img2} className="d-block w-100 main-img" alt="Hotel 2" />
              <Carousel.Caption>
                <h3>Elegant Interiors</h3>
                <p>Experience premium rooms & suites</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={img3} className="d-block w-100 main-img" alt="Hotel 3" />
              <Carousel.Caption>
                <h3>Memorable Dining</h3>
                <p>Delicious cuisines from around the world</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Booking Bar */}
      <div className="booking-bar shadow-lg px-3">
        <Row className="g-0 align-items-center navbar-checkin text-center">
          {/* Check-In */}
          <Col xs={12} sm={6} md={3} className="booking-field border-end">
            <div className="label"><FaCalendarAlt className="icon" /> Check-In</div>
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
              className="datepicker-input"
              calendarClassName="custom-datepicker"
              popperPlacement="bottom-start"
              popperContainer={({ children }) => (
                <div style={{ zIndex: 99999 }}>{children}</div>
              )}
            />
          </Col>

          {/* Check-Out */}
          <Col xs={12} sm={6} md={3} className="booking-field border-end">
            <div className="label"><FaCalendarAlt className="icon" /> Check-Out</div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              className="datepicker-input"
              calendarClassName="custom-datepicker"
              popperPlacement="bottom-start"
              popperContainer={({ children }) => (
                <div style={{ zIndex: 99999 }}>{children}</div>
              )}
            />
          </Col>

          {/* Guests */}
          <Col xs={12} sm={6} md={2} className="booking-field border-end">
            <div className="label"><FaUsers className="icon" /> Guests</div>
            <Form.Select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="guests-select"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </Form.Select>
          </Col>

          {/* Price + Button */}
          <Col
            xs={12}
            sm={6}
            md={4}
            className="booking-action d-flex flex-column flex-md-row justify-content-md-between align-items-center"
          >
            {nights > 0 ? (
              <div className="price-info mb-2 mb-md-0 me-md-3">
                <FaDollarSign className="icon" /> {nights} Night(s) – <strong>${totalPrice}</strong>
              </div>
            ) : (
              <Form.Text className="promo-text mb-1">Have a promotion code?</Form.Text>
            )}
            <Button className="btn-availability">CHECK AVAILABILITY</Button>
          </Col>
        </Row>
      </div>
    </section>
  );
}
