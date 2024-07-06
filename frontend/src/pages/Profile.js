import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Container, Form, Button } from "react-bootstrap";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    allergies: "",
    preferences: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username,
        allergies: user.allergies.join(", "),
        preferences: user.preferences.join(", "),
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await axios.put("/api/users/me", {
      allergies: profile.allergies.split(",").map((a) => a.trim()),
      preferences: profile.preferences.split(",").map((p) => p.trim()),
    });
  };

  return (
    <Container>
      <h2 className="my-4">Profile</h2>
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={profile.username} readOnly />
        </Form.Group>
        <Form.Group controlId="formAllergies">
          <Form.Label>Allergies</Form.Label>
          <Form.Control
            type="text"
            value={profile.allergies}
            onChange={(e) =>
              setProfile({ ...profile, allergies: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formPreferences">
          <Form.Label>Preferences</Form.Label>
          <Form.Control
            type="text"
            value={profile.preferences}
            onChange={(e) =>
              setProfile({ ...profile, preferences: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
