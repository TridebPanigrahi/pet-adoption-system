const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route

app.get("/", (req, res) => {
  res.send("Pet Adoption Api running");
});

app.use("/api/auth", authRoutes);

// Conneting DB

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const PORT = process.env.PORT || 5000;

//Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
