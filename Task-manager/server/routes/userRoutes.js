import express from "express";
import {
  addUser,
  getUserById,
  getUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/register/add", addUser);
router.get("/uid/:uid", getUserById);
router.get("/email/:email", getUserByEmail);

export default router;
