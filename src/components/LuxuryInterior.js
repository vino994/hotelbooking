import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Toast,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./LuxuryInterior.css";
import room1 from "../assets/h11.jpg";
import room2 from "../assets/h12.jpg";
import room3 from "../assets/h13.jpg";
import bigRoom from "../assets/h2.jpg";

export default function LuxuryInterior() {
  const rooms = [
    { title: "Classic Room", price: 39, img: room1 },
    { title: "Grand Deluxe Room", price: 59, img: room2 },
    { title: "Ultra Superior Room", price: 79, img: room3 },
    { title: "Grand Deluxe Room", price: 59, img: room2 },
    { title: "Ultra Superior Room", price: 79, img: room3 },
  ];

  const [selectedRoom, setSelectedRoom] = useState(bigRoom);
  const [modalShow, setModalShow] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  // Booking form state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState("1");

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("light");

  const handleBookNow = (room) => {
    setActiveRoom(room);
    setModalShow(true);
  };

  // Calculate number of nights & total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = checkOut - checkIn;
    return diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) : 0;
  };

  const totalPrice = activeRoom ? calculateNights() * activeRoom.price : 0;

  const showToastMessage = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleConfirmBooking = () => {
    if (!checkIn || !checkOut) {
      showToastMessage("⚠️ Please select check-in and check-out dates.", "danger");
      return;
    }
    if (calculateNights() <= 0) {
      showToastMessage("⚠️ Check-out must be after check-in.", "danger");
      return;
    }

    showToastMessage(
      `✅ Booking Confirmed!\nRoom: ${activeRoom.title}\nGuests: ${guests}\nTotal: $${totalPrice}`,
      "success"
    );
    setModalShow(false);

    // Reset form
    setCheckIn(null);
    setCheckOut(null);
    setGuests("1");
  };

  return (
    <section className="luxury-section py-5">
      <Container fluid>
        <Row>
          {/* Left Side - Scrollable */}
          <Col md={5} xs={12} className="left-side mb-4 mb-md-0">
            <p className="sub-title">DISCOVER OUR ROOMS</p>
            <h2 className="title">Luxury Interior</h2>
            <div className="room-list mt-4">
              {rooms.map((room, index) => (
                <Card
                  key={index}
                  className={`room-card mb-3 ${
                    selectedRoom === room.img ? "active" : ""
                  }`}
                  onClick={() => setSelectedRoom(room.img)}
                >
                  <Row className="g-0">
                    <Col xs={4}>
                      <Card.Img src={room.img} alt={room.title} />
                    </Col>
                    <Col xs={8}>
                      <Card.Body>
                        <Card.Title className="room-title">
                          {room.title}
                        </Card.Title>
                        <Card.Text className="room-price">
                          Starting from: <span>${room.price}.00/Night</span>
                        </Card.Text>
                        <Button
                          size="sm"
                          className="book-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow(room);
                          }}
                        >
                          Book Now
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>

          {/* Right Side - Big Image */}
          <Col
            md={7}
            xs={12}
            className="right-side d-flex align-items-center justify-content-center"
          >
            <img
              src={selectedRoom}
              alt="Luxury Room"
              className="img-fluid big-room animate-img"
            />
          </Col>
        </Row>
      </Container>

      {/* Booking Modal */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="md"
        className="booking-modal"
      >
        {activeRoom && (
          <>
            <Modal.Header closeButton className="modal-header-styled">
              <Modal.Title>{activeRoom.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-styled">
              <img
                src={activeRoom.img}
                alt={activeRoom.title}
                className="img-fluid rounded mb-3 shadow-sm"
              />
              <p className="price-text">
                <strong>Price per Night:</strong> ${activeRoom.price}
              </p>

              {/* Booking Form */}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Check-in Date</Form.Label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Select check-in date"
                    className="form-control fancy-input"
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
                    placeholderText="Select check-out date"
                    className="form-control fancy-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Guests</Form.Label>
                  <Form.Select
                    className="fancy-input"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </Form.Select>
                </Form.Group>

                {calculateNights() > 0 && (
                  <div className="price-summary mt-3 p-3 rounded">
                    <p>
                      <strong>Nights:</strong> {calculateNights()}
                    </p>
                    <p>
                      <strong>Total Price:</strong> ${totalPrice}
                    </p>
                  </div>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
              <Button className="confirm-btn" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className="text-white fw-bold">{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </section>
  );
}
