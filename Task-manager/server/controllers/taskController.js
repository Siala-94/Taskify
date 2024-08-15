import Task from "../models/task"; // Adjust the import path as needed

// Add task
export const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Get all tasks with no projectID
export const getTasksWithNoProjectID = async (req, res) => {
  try {
    const tasks = await Task.find({ project: { $exists: false } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks with due date
export const getTasksWithDueDate = async (req, res) => {
  try {
    const tasks = await Task.find({ dueDate: { $exists: true } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo project comments.createdBy"
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put comment
export const putComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.comments.push({ text: req.body.text, createdBy: req.body.createdBy });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put priority
export const putPriority = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { priority: req.body.priority },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put label
export const putLabel = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.labels = req.body.labels;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put due date
export const putDueDate = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { dueDate: req.body.dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put assignedTo
export const putAssignedTo = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.assignedTo = req.body.assignedTo;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Put timeSpentOnTask
export const putTimeSpentOnTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { timeSpentOnTask: req.body.timeSpentOnTask },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change project
export const changeProject = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { project: req.body.project },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change name
export const changeName = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change description
export const changeDescription = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
