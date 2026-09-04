import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../utils/upload.js";
import {createVisitor,getVisitors,deleteVisitor} from "../controllers/visitorController.js";

/*
Visitor Routes: This file contains all routes related to visitor management.
It allows authorized users to- Add a new visitor, View visitor records, Delete a visitor. The routes are protected using authentication and role-based authorization.
*/

const router = express.Router();

// Get All Visitors: Admin, Employee, Security and Visitor roles can view the list of visitors.
router.get("/",authMiddleware,roleMiddleware("admin", "employee", "security", "visitor"),getVisitors);
// Delete Visitor
router.delete( "/:id", authMiddleware, roleMiddleware("admin"),deleteVisitor);
// Add New Visitor
// Admin and Employee can register a new visitor, upload.single("photo") uploads one image file named "photo" before the controller is executed.
router.post( "/", authMiddleware,roleMiddleware("admin", "employee"),upload.single("photo"),createVisitor);

export default router;