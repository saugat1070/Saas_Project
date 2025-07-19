import { NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IERequest extends Request{
    headers : any & {
        authorization : any
    }
}

export const isLogin = ()=>{
    return ((req:IERequest,res:Response,next:NextFunction)=>{
        const auth = req.headers?.authorization;
    })
}