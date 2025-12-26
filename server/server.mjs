import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

console.log("Server file loaded ✅");



const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("Mongo Error ❌", err));

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

