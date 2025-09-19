import React from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer py-4">
      <Container className="text-center">
        <p className="mb-2">© 2025 EliteStay Hotels. All Rights Reserved.</p>
        <div className="d-flex justify-content-center gap-3 social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </Container>
    </footer>
  );
}
