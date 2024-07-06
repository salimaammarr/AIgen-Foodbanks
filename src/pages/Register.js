import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receiver");
  const [allergies, setAllergies] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/register", {
        username,
        password,
        role,
        allergies: allergies.split(",").map((a) => a.trim()),
        preferences: preferences.split(",").map((p) => p.trim()),
      });
      history.push("/login");
    } catch (err) {
      console.error("Failed to register", err);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="receiver">Receiver</option>
            <option value="employee">Employee</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAllergies">
          <Form.Label>Allergies</Form.Label>
          <Form.Control
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPreferences">
          <Form.Label>Preferences</Form.Label>
          <Form.Control
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
