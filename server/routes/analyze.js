import express from "express";
import { analyzeCode } from "../controllers/analyzeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/analyze
router.post("/", authMiddleware, analyzeCode);

export default router;
