import express from "express";

import {
  generatePass,
  getPasses,generatePassPDF
} from "../controllers/passController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
// import { generatePassPDF } from './../controllers/passController';

const router = express.Router();

router.post("/",authMiddleware, generatePass);

router.get("/",authMiddleware, getPasses);
router.post("/:id/pdf", authMiddleware, roleMiddleware("admin", "security"),generatePassPDF);

export default router;