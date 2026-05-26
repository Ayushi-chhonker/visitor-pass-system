import express from "express";

import {
  generatePass,
  getPasses
} from "../controllers/passController.js";

const router = express.Router();

router.post("/", generatePass);

router.get("/", getPasses);

export default router;