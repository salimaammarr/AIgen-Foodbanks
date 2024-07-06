const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, role, allergies, preferences } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hashedPassword,
      role,
      allergies,
      preferences,
    };
    const collection = req.dbClient.db("foodbank").collection("users");
    await collection.insertOne(user);
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const collection = req.dbClient.db("foodbank").collection("users");
    const user = await collection.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/me", auth, async (req, res) => {
  const collection = req.dbClient.db("foodbank").collection("users");
  const user = await collection.findOne(
    { _id: req.user.id },
    { projection: { password: 0 } }
  );
  res.json(user);
});

module.exports = router;
