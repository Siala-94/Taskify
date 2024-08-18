import Task from "../models/taskModel.js"; // Adjust the import path as needed
import Project from "../models/projectModel.js";
// Add task
export const addTask = async (req, res) => {
  console.log("incoming body", req.body);
  try {
    const task = new Task(req.body);
    console.log(task);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addSubTask = async (req, res) => {
  console.log(req.params.taskId);
  const parentID = req.params.taskId;
  try {
    const newSubTask = new Task(req.body);
    console.log(newSubTask);
    const savedSubTask = await newSubTask.save();
    console.log("success");
    console.log(parentID);
    const parentTask = await Task.findByIdAndUpdate(
      parentID,
      { $push: { subTask: savedSubTask._id } },
      { new: true }
    );
    console.log("found parentTask", parentTask);

    if (!parentTask) {
      return res.status(404).json({ message: "Parent task not found" });
    }
    res.status(201).json({ parentTask, subTask: savedSubTask });
  } catch (error) {
    console.error("Error adding sub task:", error);
    res.status(500).json({ message: error.message });
  }
};

// Function to remove subtasks recursively
const removeSubTasks = async (subTaskIDs) => {
  for (const subTaskID of subTaskIDs) {
    const subTask = await Task.findById(subTaskID);

    if (subTask) {
      // Recursively remove subtasks
      if (subTask.subTask && subTask.subTask.length > 0) {
        await removeSubTasks(subTask.subTask);
      }

      await Task.findByIdAndDelete(subTaskID);

      // Remove references to the deleted subtask from other tasks
      await Task.updateMany(
        { subTask: subTaskID },
        { $pull: { subTask: subTaskID } }
      );
    }
  }
};

// Function to remove a task and its subtasks
export const removeTask = async (req, res) => {
  console.log("request to remove task");
  const taskID = req.params.taskId;
  console.log("request params", taskID);

  try {
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.subTask && task.subTask.length > 0) {
      await removeSubTasks(task.subTask);
    }

    await Task.findByIdAndDelete(taskID);

    // Remove references to the deleted task from other tasks
    await Task.updateMany({ subTask: taskID }, { $pull: { subTask: taskID } });

    res
      .status(200)
      .json({ message: "Task and its subtasks removed successfully" });
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks by projectID
export const getTasksByProjectID = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectID });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks with no projectID for a specific user
export const getTasksWithNoProjectID = async (req, res) => {
  const userID = req.params.userID; // Assuming the user ID is passed as a URL parameter

  try {
    const tasks = await Task.find({
      project: { $exists: false },
      members: userID,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get task
export const getTaskByTaskID = async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put comment
export const putComment = async (req, res) => {
  const taskID = req.params.taskID;
  const { comment, user } = req.body;

  try {
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.comments.push({ text: comment, createdBy: user });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const taskID = req.params.taskID; // Extract taskID from the request parameters
  const updateData = req.body; // Get all the update data from the request body

  try {
    // Find the task by ID and update it with the new data
    const task = await Task.findByIdAndUpdate(taskID, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated data
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
