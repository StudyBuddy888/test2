import express from "express";
import { addTask, updateTaskStatus, getTasks } from "../controllers/taskController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// 📌 Route to add a new task for a user
router.post("/add-task", userAuth, addTask);

// 📌 Route to update a specific task's status
router.put("/update-task/:taskId", userAuth, updateTaskStatus);

// 📌 Route to get all tasks for a specific user
router.get("/user-tasks/:userId", userAuth, getTasks);

export default router;
