import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { getUserData } from "../controllers/userCntroller.js";

const router = express.Router();

router.get("/data", userAuth, getUserData);

export default router;
