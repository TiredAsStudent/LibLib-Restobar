import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

//Access the .env file and create a express app
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect DB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection failed:", error));
