import {User,Task} from "../models/userModel.js";

// 📌 Add a Task to a User's Account
// 📌 Add a Task to a User's Account
// In taskController.js
export const addTask = async (req, res) => {
  try {
    const { title, startTime } = req.body;

    if (!title || !startTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Example: Log incoming request data
    console.log("Received data:", req.body);

    // Create a new Task instance
    const newTask = new Task({
      title,
      startTime,
      status: "Incomplete",
      createdAt: new Date(),
      userId: req.body.userId, // Make sure the userId is correctly passed
    });

    // Save the new task to the database
    await newTask.save();

    // Assuming you have a userId from the decoded JWT (token)
    const userId = req.body.userId; // Or get from token, depending on your middleware setup
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Push the saved task's ObjectId into the user's tasks array
    user.tasks.push(newTask._id);
    await user.save();

    // Log the user data after task addition
    console.log("Updated user tasks:", user.tasks);

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      tasks: user.tasks,
    });
  } catch (err) {
    // Log the error to the console
    console.error("Error adding task:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📌 Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const { taskId } = req.params;

    if (!userId || !taskId || !status) {
      return res.status(400).json({ success: false, message: "Missing userId, taskId, or status" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.status": status } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User or Task not found" });
    }

    res.status(200).json({ success: true, message: "Task status updated", tasks: user.tasks });

  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📌 Get Tasks for a Specific User
// 📌 Get Tasks for a Specific User
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      tasks: user.tasks.map(task => ({
        ...task.toObject(),
        startTime: task.startTime.toISOString(), // Ensure startTime is in ISO string format
      })),
    });

  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
