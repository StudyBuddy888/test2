import mongoose from "mongoose";

// Task Schema
const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },  // Ensure startTime is in the schema
  status: {
    type: String,
    enum: ["Completed", "Incompleted", "Skipped"],
    default: "Incompleted",
  },
  createdAt: { type: Date, default: Date.now },
});


// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOTP: { type: String, default: "" },
  verifyOTPExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOTP: { type: String, default: "" },
  resetOTPExpireAt: { type: Number, default: 0 },
  taskScheduleTime: { type: Date, default: Date.now }, // Changed from sessionTime to taskScheduleTime
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

// Ensure models are created only once
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

// ✅ Export as named and default
export { User, Task };
export default User;  // ✅ Add this line to allow `import User from ...`
