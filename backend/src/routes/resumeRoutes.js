import express from "express";
import {
  createOrUpdateResume,
  getResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createOrUpdateResume)
  .get(protect, getResume)
  .delete(protect, deleteResume);

export default router;