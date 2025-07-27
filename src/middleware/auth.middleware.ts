import { NextFunction,Response,Request } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { IERequest } from "../config/interface";


export const isLogin = (req:IERequest,res:Response,next:NextFunction)=>{
        const auth = req.headers?.authorization as string;
        const token = auth && auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
    jwt.verify(token,envConfig.jwtSecretKey,(err:any,result:any)=>{
        if(err){
            res.status(401).json({
                status : "fail",
                message : "authentication failed",
            });
        }else{
        const {userId:id} = result;
        req.user = {
            id : id
        }
        next();
        }
    })
}