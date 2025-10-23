import express from "express";
import { getSubmissions, getSubmissionById } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all submissions of the logged-in user
router.get("/submissions", authMiddleware, getSubmissions);

// Get a single submission by ID
router.get("/submission/:id", authMiddleware, getSubmissionById);

export default router;
