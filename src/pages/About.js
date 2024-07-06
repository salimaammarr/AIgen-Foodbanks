import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="about-container">
      <NavigationBar />
      <Container className="about-content">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="position-relative">
            <Button className="close-button" onClick={handleRedirect}>
              ×
            </Button>
            <h1 className="display-4 about-title">About Us</h1>
            <p className="about-text">
              Welcome to the Foodbank App. Our mission is to help manage food
              donations and distributions efficiently and effectively. We strive
              to support communities by ensuring that food reaches those in need
              in a timely and organized manner.
            </p>
            <p className="about-text">
              Our app provides tools for both employees and receivers to manage
              inventory, track donations, and distribute food efficiently.
              Employees can easily add and track food items, while recipients
              can register and choose their preferred food options.
            </p>
            <p className="about-text">
              Thank you for being a part of our mission to eliminate hunger and
              support those in need. Together, we can make a difference.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
