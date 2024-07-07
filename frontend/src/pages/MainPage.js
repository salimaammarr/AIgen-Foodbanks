import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
      <div className="image-container">
        <Image
          src="images/main.webp"
          alt="Welcome"
          className="img-fluid full-width-image"
        />

        <div className="overlay">
          <NavigationBar />
        </div>
      </div>
      <Container className="main-content text-center">
        <Row>
          <Col className="mt-5">
            <h1 className="display-4 welcome-text">Welcome to the</h1>
            <h1 className="display-4 brand-name">Foodbank App</h1>
            <p className="lead mission-text">
              Our mission is to help manage food donations and distributions
              efficiently and effectively.
            </p>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col md={6} className="mb-4">
            <h3>For Employees</h3>
            <p>
              Manage inventory, track donations, and distribute food to those in
              need.
            </p>
            <LinkContainer to="/login">
              <Button className="cta-button">Login as Employee</Button>
            </LinkContainer>
          </Col>
          <Col md={6}>
            <h3>For Receivers</h3>
            <p>
              Register to receive food, update your preferences, and manage your
              profile.
            </p>
            <LinkContainer to="/login">
              <Button className="cta-button">Login as Receiver</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
