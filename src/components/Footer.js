import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Image } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css";

// sample hotel/resort images
import aboutImg from "../assets/h11.jpg";
import roomImg from "../assets/h12.jpg";
import reservationImg from "../assets/h13.jpg";
import blogImg from "../assets/h7.jpg";
import contactImg from "../assets/h2.jpg";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const handleShow = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <>
      <footer className="footer-section">
        <Container>
          <Row className="gy-4">
            {/* Logo + About */}
            <Col md={4} className="footer-about">
              <h2 className="hotel-logo">EliteStay</h2>
              <p className="footer-text">
                Experience luxury, comfort, and elegance at EliteStay. 
                We bring you world-class hospitality with beautiful rooms, 
                fine dining, and unforgettable memories.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={2} className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li>
                  <button
                    onClick={() =>
                      handleShow(
                        "About Us",
                        <>
                          <Image src={aboutImg} fluid rounded className="mb-3" />
                          <p>
                            EliteStay is a premium luxury hotel located in the heart of Aranthangi. 
                            We are known for our unmatched service, modern interiors, 
                            and unforgettable guest experiences.
                          </p>
                          <p>
                            Our team ensures your stay is more than just comfortable – 
                            it’s an experience of elegance and hospitality at its finest.
                          </p>
                        </>
                      )
                    }
                  >
                    About Us
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      handleShow(
                        "Our Rooms",
                        <>
                          <Image src={roomImg} fluid rounded className="mb-3" />
                          <p>
                            Choose from a variety of luxury rooms – Classic, Deluxe, and Superior Suites.
                          </p>
                          <p>
                            Each room features elegant interiors, high-speed Wi-Fi, 
                            premium bedding, and 24/7 concierge service.
                          </p>
                        </>
                      )
                    }
                  >
                    Our Rooms
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      handleShow(
                        "Reservation",
                        <>
                          <Image src={reservationImg} fluid rounded className="mb-3" />
                          <p>
                            Booking your dream stay is simple! 
                            Select your check-in and check-out dates, 
                            choose your room type, and confirm your booking in minutes.
                          </p>
                          <p>
                            We also provide seasonal discounts and exclusive offers 
                            for early reservations.
                          </p>
                        </>
                      )
                    }
                  >
                    Reservation
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      handleShow(
                        "Blog",
                        <>
                          <Image src={blogImg} fluid rounded className="mb-3" />
                          <p>
                            Explore travel stories, hotel updates, 
                            and insider tips on making the most of your EliteStay visit.
                          </p>
                          <p>
                            From food guides to local experiences, 
                            our blog connects you with both comfort and culture.
                          </p>
                        </>
                      )
                    }
                  >
                    Blog
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      handleShow(
                        "Contact",
                        <>
                          <Image src={contactImg} fluid rounded className="mb-3" />
                          <p>
                            Reach us anytime for queries, bookings, or feedback. 
                            Our support team is available 24/7.
                          </p>
                          <p>
                            <strong>Address:</strong> 123 Aranthangi, 614616 <br />
                            <strong>Phone:</strong> +191 9390334317 <br />
                            <strong>Email:</strong> vinodjayasudha@gmail.com
                          </p>
                        </>
                      )
                    }
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={3} className="footer-contact">
              <h5>Contact Us</h5>
              <p><strong>Address:</strong> 123 Aranthangi, 614616</p>
              <p><strong>Phone:</strong> +191 9390334317</p>
              <p><strong>Email:</strong> vinodjayasudha@gmail.com</p>
            </Col>

            {/* Social Media */}
            <Col md={3} className="footer-social">
              <h5>Follow Us</h5>
              <div className="social-icons">
                <button
                  onClick={() =>
                    handleShow(
                      "Facebook",
                      <>
                        <Image src={aboutImg} fluid rounded className="mb-3" />
                        <p>
                          Follow EliteStay on Facebook for the latest offers, events, and guest stories.  
                          Be part of our community and share your EliteStay moments!
                        </p>
                      </>
                    )
                  }
                >
                  <FaFacebookF />
                </button>

                <button
                  onClick={() =>
                    handleShow(
                      "Twitter",
                      <>
                        <Image src={roomImg} fluid rounded className="mb-3" />
                        <p>
                          Join the conversation on Twitter – get real-time announcements, 
                          exclusive discounts, and travel inspiration.
                        </p>
                      </>
                    )
                  }
                >
                  <FaTwitter />
                </button>

                <button
                  onClick={() =>
                    handleShow(
                      "Instagram",
                      <>
                        <Image src={blogImg} fluid rounded className="mb-3" />
                        <p>
                          Discover stunning room designs and behind-the-scenes stories 
                          on our Instagram gallery. 
                        </p>
                        <p>
                          Tag us with <strong>#EliteStay</strong> to get featured!
                        </p>
                      </>
                    )
                  }
                >
                  <FaInstagram />
                </button>

                <button
                  onClick={() =>
                    handleShow(
                      "LinkedIn",
                      <>
                        <Image src={contactImg} fluid rounded className="mb-3" />
                        <p>
                          Connect with us on LinkedIn for business collaborations, 
                          career opportunities, and professional updates.
                        </p>
                      </>
                    )
                  }
                >
                  <FaLinkedinIn />
                </button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="text-center mt-4">
              <p className="footer-bottom">
                © {new Date().getFullYear()} EliteStay Hotel & Resort. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
