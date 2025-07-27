import User from "../database/model/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Session } from "express-session";
import { tokenGen } from "../utils/tokenGen";
import { IERequest } from "../config/interface";

// Ensure your Express app uses body-parser middleware:
// import express from "express";
// import bodyParser from "body-parser";
// const app = express();
// app.use(bodyParser.json());


class AuthController {
  constructor() {}
  public async Register(req: Request, res: Response) {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res.status(400).json({
        status: "fail",
        message: "please provide all data",
      });
      return;
    }
    try {
      const [findUser] = await User.findAll({
        where: {
          email: email,
        },
      });
      if (findUser) {
        res.status(403).json({
          status: "fail",
          message: "user with this email is already created",
        });
        return;
      }

      const userRegister = await User.create({
        ...req.body,
        password: bcrypt.hashSync(password, 10),
      });
      if (!userRegister) {
        res.status(501).json({
          status: "fail",
          message: "user registration is failed on database",
        });
      }
      res.status(200).json({
        status: "success",
        message: "user register successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        status: "fail",
        message: "Error on databae",
        error: err.message,
      });
    }
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "email and password must be provided",
      });
      return;
    }
    try {
      const [findUser] = await User.findAll({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        res.status(404).json({
          status: "fail",
          message: "please register first",
        });
        return;
      }
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        findUser?.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "fail",
          message: "password is incorrect",
        });
        return;
      }
      /* req.session.user = {
        email : findUser.email,
        userId: String(findUser.id)
      }; */
      const token = tokenGen(findUser.id);
      console.log(token)
      res.status(200).json({
        status: "success",
        message: "user login successfully",
        token : token
      });
    } catch (error: any) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  }
// Session Authentication
/*   public async fetchProfile(req: IEXRequest, res: Response) {
    if(!req.session.user){
        res.status(401).json({
            status : "fail",
            message : "please login first"
        })
    }
    const { userId, email } = req.session.user;
    if (!userId || !email) {
      res.status(404).json({
        message: "id and email is not found from session",
      });
      return;
    }

    const user = await User.findByPk(userId,{
        attributes:["id","username","email","role"]
    });
    res.json({
      data: user,
    });
  } */

  public async fetchProfile(req:IERequest,res:Response){
    const {id:userId} = req.user
    if(!userId){
      res.status(401).json({
        status : "fail",
        message : "login first"
      });return;
    }
    try {
      const userInfo = await User.findAll({
      where:{
        id : userId
      },
      attributes:["id","username","email","role"]
    });
    if(!userInfo){
      res.status(404).json({
        status : "fail",
        message : "user information is not fetch from database"
      });return
    }

    res.status(200).json({
      status : "success",
      message : "profile fetch successfully",
      data : userInfo
    })
    } catch (error : Error | any) {
      res.status(500).json({
        message : "Error on server",
        Error : error.message
      })
    }
  }
}

const authController = new AuthController();
export default authController;
