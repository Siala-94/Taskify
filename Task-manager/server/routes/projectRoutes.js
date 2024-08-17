import express from "express";
import {
  addProject,
  getProjectByUserObjectId,
  removeProject,
  addSubProject,
  addMembersToProject,
  removeMemberFromProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", addProject);
router.get("/get/:objectId", getProjectByUserObjectId);
router.delete("/delete/:projectId", removeProject);
router.put("/delete/member", removeMemberFromProject);
router.post("/addSubProject/:projectId", addSubProject);
router.post("/add/member", addMembersToProject);

export default router;
