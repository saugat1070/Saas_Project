import express, { Router } from "express";
import { instituteController } from "../../Controller/institute/instituteController";
const instituteRouter : Router = express.Router();

instituteRouter.route("/create").post(instituteController.createInstitute);

export default instituteRouter;