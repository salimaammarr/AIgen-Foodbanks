import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavigationBar from "../components/Navbar";
import "./Login.css";

const Login = ({ history }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      history.push("/dashboard");
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <NavigationBar />
      <Container className="login-content">
        <Row className="justify-content-center">
          <Col md={6} className="position-relative">
            <Button className="close-button" onClick={handleRedirect}>
              ×
            </Button>
            <h1 className="display-4 login-title">Login</h1>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="cta-button">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
