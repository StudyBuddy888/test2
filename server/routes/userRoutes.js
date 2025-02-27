import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

// 📌 Route to get the authenticated user's data (authentication required)
userRouter.get('/profile', userAuth, getUserData); // Changed '/data' to '/profile' for clarity

export default userRouter;
