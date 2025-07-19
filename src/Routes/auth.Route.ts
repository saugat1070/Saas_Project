import authController from "../Controller/authController";
import express from "express";

const router = express.Router();

router.route("/register").post(authController.Register);
router.route("/login").post(authController.loginUser);
router.route("/profile").get(authController.fetchProfile)

export default router;