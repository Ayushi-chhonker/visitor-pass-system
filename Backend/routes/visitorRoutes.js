import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../utils/upload.js";
import {createVisitor,getVisitors,deleteVisitor} from "../controllers/visitorController.js";

const router = express.Router();

// Admin, employee,visitor and security can view visitors
router.get( "/", authMiddleware,roleMiddleware("admin", "employee", "security","visitor"),getVisitors);

// Only admin can delete a visitor
router.delete( "/:id", authMiddleware, roleMiddleware("admin"), deleteVisitor);

// Admin and employee can add a new visitor upload.single() handles the visitor photo
router.post("/",authMiddleware,roleMiddleware("admin", "employee"),upload.single("photo"),createVisitor);

export default router;