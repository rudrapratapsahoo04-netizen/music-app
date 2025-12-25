console.log("Server file loaded ✅");
console.log("Server file loaded ✅");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Music Backend Running 🎵");
});

app.use("/songs", require("./routes/songRoutes"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});


