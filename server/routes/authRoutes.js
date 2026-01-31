import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOTP,
  sendVerifyOTP,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/send-verify-otp", userAuth, sendVerifyOTP);
router.post("/verify-account", userAuth, verifyEmail);
router.post("/is-auth", userAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOTP);
router.post("/reset-password", resetPassword);

export default router;
