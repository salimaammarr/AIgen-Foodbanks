import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Container, Form, Button, Table } from "react-bootstrap";

const Dashboard = () => {
  const { user } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
  });

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

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/food",
        newFoodItem
      );
      setFoodItems([...foodItems, response.data]);
      setNewFoodItem({ name: "", quantity: "", expiryDate: "" });
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Dashboard</h2>
      {user.role === "employee" && (
        <Form onSubmit={handleAddFoodItem} className="mb-4">
          <h3>Add Food Item</h3>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newFoodItem.name}
              onChange={(e) =>
                setNewFoodItem({ ...newFoodItem, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={newFoodItem.quantity}
              onChange={(e) =>
                setNewFoodItem({ ...newFoodItem, quantity: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={newFoodItem.expiryDate}
              onChange={(e) =>
                setNewFoodItem({ ...newFoodItem, expiryDate: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Food Item
          </Button>
        </Form>
      )}
      <h3>Food Inventory</h3>
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

export default Dashboard;
