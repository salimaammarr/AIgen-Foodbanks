import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";

const FoodSelection = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [preferences, setPreferences] = useState({ liked: "", disliked: "" });

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/food");
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/me/preferences", {
        liked: preferences.liked.split(",").map((p) => p.trim()),
        disliked: preferences.disliked.split(",").map((p) => p.trim()),
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Food Selection</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLiked">
          <Form.Label>Liked Food</Form.Label>
          <Form.Control
            type="text"
            value={preferences.liked}
            onChange={(e) =>
              setPreferences({ ...preferences, liked: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formDisliked">
          <Form.Label>Disliked Food</Form.Label>
          <Form.Control
            type="text"
            value={preferences.disliked}
            onChange={(e) =>
              setPreferences({ ...preferences, disliked: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Preferences
        </Button>
      </Form>
      <h3>Available Food Items</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.expiryDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FoodSelection;
