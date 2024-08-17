import express from "express";
import {
  addUser,
  getUserById,
  getUserByEmail,
  getUserByOID,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/register/add", addUser);
router.get("/uid/:uid", getUserById);
router.get("/ouid/:uid", getUserByOID);
router.get("/email/:email", getUserByEmail);

export default router;
