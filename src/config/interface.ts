import { Request } from "express"
export enum Role{
    student = "student",
    teacher = "teacher",
    institute = "institute",
    superAdmin = "superadmin"
}

export interface IERequest extends Request{
    user ?: any & {
        id : any
    },
    institute? : {
        instituteNumber : any,
        instituteName : String
    }
}