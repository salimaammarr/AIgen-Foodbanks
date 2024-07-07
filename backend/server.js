const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo().catch(console.dir);

app.use((req, res, next) => {
  req.dbClient = client;
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
