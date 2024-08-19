import express from "express";
import {
  addTask,
  addSubTask,
  removeTask,
  getTasksByProjectID,
  getTasksWithNoProjectID,
  getTaskByTaskID,
  putComment,
  updateTask,
  getTasksWithDueDate,
  getTasksWithDueDateToday,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", addTask);
router.post("/add/:taskId", addSubTask);
router.delete("/delete/:taskId", removeTask);
router.get("/get/allTasks/:projectID", getTasksByProjectID);
router.get("/get/inbox/:userID", getTasksWithNoProjectID);
router.get("/get/taskByTaskID/:taskID", getTaskByTaskID);
router.put("/put/comment/:taskID", putComment);
router.put("/put/task/:taskID", updateTask);
router.get("/get/tasksWithDate/:userID", getTasksWithDueDate);
router.get("/get/tasksWithTodayDate/:userID", getTasksWithDueDateToday);
export default router;
