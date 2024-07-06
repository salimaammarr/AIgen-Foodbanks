import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert("Message sent successfully!");
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <NavigationBar />
      <div className="contact-container">
        <Container className="contact-content">
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="position-relative">
              <Button className="close-button" onClick={handleRedirect}>
                ×
              </Button>
              <h1 className="display-4 contact-title">Contact Us</h1>
              <Form onSubmit={handleSubmit} className="contact-form">
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="cta-button">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
