import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHotel } from "react-icons/fa";


export default function CustomNavbar() {
  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="brand d-flex align-items-center">
          <FaHotel className="me-2 text-warning" /> EliteStay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#rooms">Rooms</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
