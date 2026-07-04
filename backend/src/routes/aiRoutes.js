import express from "express";
import {
  reviewResume,
  generateCoverLetter,
  generateInterviewQuestions,
  generateProjectExplanation,
  generateQuickPrompt,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/resume-review", protect, reviewResume);
router.post("/cover-letter", protect, generateCoverLetter);
router.post("/interview-questions", protect, generateInterviewQuestions);
router.post("/project-explanation", protect, generateProjectExplanation);
router.post("/quick-prompt", protect, generateQuickPrompt);

export default router;