import authController from "../Controller/authController";
import express from "express";
import { isLogin } from "../middleware/auth.middleware";
const router = express.Router();

router.route("/register").post(authController.Register);
router.route("/login").post(authController.loginUser);
router.route("/profile").get(isLogin,authController.fetchProfile)

export default router;