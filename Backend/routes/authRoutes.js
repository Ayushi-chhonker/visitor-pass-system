import express from "express";
import {registerUser,loginUser, getHosts} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/hosts", getHosts);

export default router;