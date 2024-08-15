import express from "express";
import {
  addTask,
  addSubTask,
  removeTask,
  getTasksByProjectID,
  getTasksWithNoProjectID,
  getTaskByTaskID,
  putComment,
  putPriority,
  putDueDate,
  putAssignedTo,
  changeProject,
  changeName,
  changeDescription,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", addTask);
router.post("/add/:taskId", addSubTask);
router.delete("/delete/:taskId", removeTask);
router.get("/get/allTasks/:projectID", getTasksByProjectID);
router.get("/get/inbox/:userID", getTasksWithNoProjectID);
router.get("/get/taskByTaskID/:taskID", getTaskByTaskID);
router.put("/put/comment/:taskID", putComment);
router.put("/put/priority/:taskID", putPriority);
router.put("/put/dueDate/:taskID", putDueDate);
router.put("/put/assignedTo/:taskID", putAssignedTo);
router.put("/put/changeProject/:taskID", changeProject);
router.put("/put/changeTaskName/:taskID", changeName);
router.put("/put/changeTaskDescription/:taskID", changeDescription);

export default router;
