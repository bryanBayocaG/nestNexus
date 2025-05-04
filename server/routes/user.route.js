import express from "express";
import {
  updateUserCredential,
  deleteUser,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/user_update/:id", verifyToken, updateUserCredential);
router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/listings/:id", verifyToken, getUserListings);
export default router;
