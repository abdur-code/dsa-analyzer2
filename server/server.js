import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import analyzeRoutes from "./routes/analyze.js";
import userRoutes from "./routes/user.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("DB connection error", err);
});
