import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getVisitors, addVisitor, deleteVisitor } from "../controllers/visitorController.js";

const router = express.Router();

// Get all visitors
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "employee", "security"),
  getVisitors
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "employee"),
  addVisitor
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteVisitor
);
export default router;