import express from "express";

import {
  login,
  register,
  logout,
  me,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Auth

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// User

router.get("/me", protect, me);

router.put(
  "/profile",
  protect,
  updateProfile
);

// Password Reset

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;