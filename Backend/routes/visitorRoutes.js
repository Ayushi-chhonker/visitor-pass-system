import express from "express";
import { addVisitor, getVisitors } from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", addVisitor);
router.get("/", getVisitors);

export default router;