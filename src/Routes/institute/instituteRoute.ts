import express, { Router } from "express";
import { instituteController } from "../../Controller/institute/instituteController";
import { isLogin } from "../../middleware/auth.middleware";
const instituteRouter : Router = express.Router();

instituteRouter.route("/create").post(isLogin,instituteController.createInstitute);

export default instituteRouter;