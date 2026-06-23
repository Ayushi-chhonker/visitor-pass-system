import express from "express";

import {generatePass,getPasses,generatePassPDF,verifyPass} from "../controllers/passController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware, generatePass);

router.get("/",authMiddleware, getPasses);
router.get("/:id/pdf", authMiddleware, roleMiddleware("admin", "security"),generatePassPDF);
router.get("/verify/:visitorId/:appointmentId", authMiddleware, verifyPass);

export default router;