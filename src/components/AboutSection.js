import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./AboutSection.css";
import aboutImg from "../assets/h8.jpg";

export default function AboutSection() {
  const tagsRef = useRef(null);
  const parallaxRef = useRef(null);
  const [animateTags, setAnimateTags] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const tagData = {
    experience: {
      title: "25+ Years Experience",
      content:
        "Our resort has been serving guests with excellence for over 25 years, offering top-notch hospitality and premium facilities.",
    },
    rooms: {
      title: "Luxury Rooms",
      content:
        "Experience our luxury rooms with modern interiors, breathtaking views, and world-class comfort.",
    },
    dining: {
      title: "5-Star Dining",
      content:
        "Enjoy exquisite gourmet meals prepared by our internationally acclaimed chefs, offering a variety of cuisines.",
    },
    spa: {
      title: "Exclusive Spa",
      content:
        "Relax and rejuvenate with our exclusive spa treatments, designed for ultimate relaxation and wellness.",
    },
  };

  // Animate tags on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimateTags(true);
      },
      { threshold: 0.3 }
    );
    if (tagsRef.current) observer.observe(tagsRef.current);
    return () => {
      if (tagsRef.current) observer.unobserve(tagsRef.current);
    };
  }, []);

  // Parallax effect for left block
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTagClick = (tagKey) => {
    setActiveTag(tagData[tagKey]);
    setShowModal(true);
  };

  return (
    <section className="about-section">
      <div className="container about-inner">
        {/* LEFT: image + rotating circle + orbiting tags */}
        <div className="about-left" ref={parallaxRef}>
          <div className="circle-text" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="200" height="200" role="img">
              <defs>
                <path
                  id="circlePath"
                  d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
                />
              </defs>
              <text fill="#d4a017" fontSize="13" fontWeight="600">
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  RESORT • MONALISA HOTEL • RESORT • MONALISA HOTEL •
                </textPath>
              </text>
            </svg>
          </div>
          <img src={aboutImg} alt="Resort view" className="about-img shadow-lg" />

          {/* Orbiting clickable tags */}
          <div
            className={`orbit-tags ${animateTags ? "animate" : ""}`}
            ref={tagsRef}
          >
            <button className="tag tag1" onClick={() => handleTagClick("experience")}>
              25+ Years Experience
            </button>
            <button className="tag tag2" onClick={() => handleTagClick("rooms")}>
              Luxury Rooms
            </button>
            <button className="tag tag3" onClick={() => handleTagClick("dining")}>
              5-Star Dining
            </button>
            <button className="tag tag4" onClick={() => handleTagClick("spa")}>
              Exclusive Spa
            </button>
          </div>
        </div>

        {/* RIGHT: text */}
        <div className="about-right">
          <p className="section-subtitle">LITTLE ABOUT US</p>
          <h2 className="about-title">A best place to enjoy your life</h2>
          <p className="about-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
            quae ab illo inventore veritatis et quasi architecto beatae vitae 
            dicta sunt explicabo.
          </p>
          <p className="about-author">
            <strong>Ethan Hunt</strong> – Director at Monalisa
          </p>

          {/* Mobile fallback tags */}
          <div className="highlight-tags-mobile">
            <button onClick={() => handleTagClick("experience")}>25+ Years Experience</button>
            <button onClick={() => handleTagClick("rooms")}>Luxury Rooms</button>
            <button onClick={() => handleTagClick("dining")}>5-Star Dining</button>
            <button onClick={() => handleTagClick("spa")}>Exclusive Spa</button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {activeTag && (
          <>
            <Modal.Header closeButton className="modal-header-styled">
              <Modal.Title>{activeTag.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-styled">
              <p>{activeTag.content}</p>
              <div className="contact-box">
                <p><strong>Contact Us:</strong></p>
                <p>Email: info@monalisahotel.com</p>
                <p>Phone: +1 (234) 567-890</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="success">Contact Now</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
}
