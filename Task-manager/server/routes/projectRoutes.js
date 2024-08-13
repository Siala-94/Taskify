import express from "express";
import {
  addProject,
  getProjectByUserObjectId,
  addSectionToProject,
  removeProject,
  addSubProject,
  deleteSectionFromProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", addProject);
router.get("/get/:objectId", getProjectByUserObjectId);
router.put("/addSection/:projectId", addSectionToProject);
router.delete("/delete/:projectId", removeProject);
router.post("/addSubProject/:projectId", addSubProject);
router.delete("/deleteSection/:projectId/:sectionId", deleteSectionFromProject); // Add this route for deleting a section

export default router;
