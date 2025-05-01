import express from "express";
import { profileUpdate } from "../controllers/user.cointroller.js";
const router = express.Router();

router.post("/avatar_update", profileUpdate);

export default router;
