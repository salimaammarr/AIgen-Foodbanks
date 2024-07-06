const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const collection = req.dbClient.db("foodbank").collection("foodItems");
  const foodItems = await collection.find().toArray();
  res.json(foodItems);
});

router.post("/", auth, async (req, res) => {
  const { name, quantity, expiryDate } = req.body;
  const foodItem = { name, quantity, expiryDate: new Date(expiryDate) };
  const collection = req.dbClient.db("foodbank").collection("foodItems");
  await collection.insertOne(foodItem);
  res.status(201).json(foodItem);
});

router.put("/:id", auth, async (req, res) => {
  const { name, quantity, expiryDate } = req.body;
  const collection = req.dbClient.db("foodbank").collection("foodItems");
  const foodItem = await collection.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, quantity, expiryDate: new Date(expiryDate) } },
    { returnOriginal: false }
  );
  res.json(foodItem.value);
});

router.delete("/:id", auth, async (req, res) => {
  const collection = req.dbClient.db("foodbank").collection("foodItems");
  await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(204).send();
});

module.exports = router;
