import express from "express";
import {
  addProject,
  getProjectByUserObjectId,
  removeProject,
  addSubProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", addProject);
router.get("/get/:objectId", getProjectByUserObjectId);
router.delete("/delete/:projectId", removeProject);
router.post("/addSubProject/:projectId", addSubProject);

export default router;
