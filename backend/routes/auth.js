// backend/routes/auth.js
import express from 'express';

import {login,register,me,updateProfile, forgotPassword, resetPassword,} from '../controllers/authController.js';
import {protect} from '../middleware/auth.js';


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,me);
router.put('/profile',protect,updateProfile);
router.post("/forgot-password", forgotPassword);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;