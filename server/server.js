import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

//Access the .env file and create a express app
dotenv.config();
const app = express();

app.set("trust proxy", 1);
connectDB();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
