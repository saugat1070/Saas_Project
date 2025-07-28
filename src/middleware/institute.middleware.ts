import { Request,Response,NextFunction } from "express";
import { IERequest } from "../config/interface";

class InstituteMiddleware{
    public passInstituteNumber = (req:IERequest,res:Response,next:NextFunction)=>{
        if(!req.institute?.instituteNumber){
            res.status(404).json({
                message : "institute number is not found"
            });
            return
        }
        next();
    }
}

const instituteMiddleware = new InstituteMiddleware();
export {instituteMiddleware};