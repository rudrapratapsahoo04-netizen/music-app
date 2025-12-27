import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// 👇 ADD THIS LINE (very important)
import songRoutes from "./routes/songRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("Mongo Error ❌", err));

// Test routes
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.get("/api", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ CORRECT ROUTE MOUNT
app.use("/api/songs", songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
