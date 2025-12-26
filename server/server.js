import mongoose from "mongoose"; 
import dotenv from "dotenv";
console.log("Server file loaded ✅");
console.log("Server file loaded ✅");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server & MongoDB working fine 🚀");
});


app.use("/songs", require("./routes/songRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

