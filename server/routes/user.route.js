import express from "express";
import { updateUserCredential } from "../controllers/user.cointroller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/user_update/:id", verifyToken, updateUserCredential);

export default router;
