import express from "express";
import {
  googleSignIn,
  signIn,
  signUp,
  signOut,
  checkSession,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.post("/google", googleSignIn);
router.post("/check-session", verifyToken, checkSession);

export default router;
