import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/authController.js";
// import loginLimiter from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
