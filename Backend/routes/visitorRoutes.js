import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../utils/upload.js";
import { createVisitor,getVisitors, deleteVisitor } from "../controllers/visitorController.js";

const router = express.Router();

// Get all visitors
router.get( "/",authMiddleware,roleMiddleware("admin", "employee", "security","visitor"),getVisitors);

router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteVisitor);

router.post("/", authMiddleware,roleMiddleware("admin", "employee"), upload.single("photo"), createVisitor);
export default router;