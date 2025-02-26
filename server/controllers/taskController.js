import User from "../models/userModel.js";

// 📌 Add a Task to a User's Account
export const addTask = async (req, res) => {
  try {
    const { userId, title, sessionTime } = req.body;

    if (!userId || !title || !sessionTime) {
      return res.status(400).json({ success: false, message: "Missing userId, title, or sessionTime" });
    }

    // Create new task object
    const newTask = {
      title,
      sessionTime,
      status: "Incomplete",
      createdAt: new Date(),
    };

    // Find user and push task into tasks array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.tasks.push(newTask);
    await user.save(); // Ensure task is saved in DB

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      tasks: user.tasks,
    });

  } catch (err) {
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

    res.status(200).json({ success: true, tasks: user.tasks });

  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
