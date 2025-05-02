import express from "express";
import {
  updateUserCredential,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/user_update/:id", verifyToken, updateUserCredential);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
