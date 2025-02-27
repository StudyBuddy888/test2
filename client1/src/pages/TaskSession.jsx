import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContent";
import { toast } from "react-toastify";

const TaskSession = () => {
  const { backendUrl, userData } = useContext(AppContent); // Get user data from context

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [status, setStatus] = useState("Pending");

  // Fetch tasks for logged-in user
  useEffect(() => {
    if (!userData?._id) return; // Ensure user is logged in before fetching tasks

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/tasks/${userData._id}`); // Fetch tasks for user
        if (data.success) {
          setTasks(data.tasks);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, [backendUrl, userData]);

  // Function to add a new task
  const handleAddTask = async () => {
    if (!taskName.trim() || !sessionTime.trim()) {
      toast.warn("Please fill all fields");
      return;
    }

    const sessionTimeNumber = parseInt(sessionTime, 10);
    if (isNaN(sessionTimeNumber) || sessionTimeNumber <= 0) {
      toast.warn("Session time must be a valid number");
      return;
    }

    const newTask = { 
      title: taskName.trim(), 
      sessionTime: sessionTimeNumber, 
      status, 
      userId: userData._id // Ensure task is linked to logged-in user
    };

    try {
      const { data } = await axios.post(`${backendUrl}/api/tasks/add`, newTask);
      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]); // Append new task
        setTaskName("");
        setSessionTime("");
        setStatus("Pending");
        toast.success("Task added successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/tasks/${id}`);
      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        toast.success("Task deleted");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Session</h2>

        {/* Task Name Input */}
        <input
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        {/* Session Time Input */}
        <input
          type="number"
          placeholder="Session Time (in minutes)"
          value={sessionTime}
          onChange={(e) => setSessionTime(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          min="1"
        />

        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Add Task Button */}
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Displaying Task List */}
      <div className="mt-6 w-full max-w-md">
        {tasks.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Task List</h3>
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-2 border-b flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{task.title}</span> -{" "}
                  <span className="text-gray-500">{task.sessionTime} min</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded ${
                      task.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSession;
