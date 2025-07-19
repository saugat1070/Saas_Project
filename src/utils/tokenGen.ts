import jwt from "jsonwebtoken"
import { envConfig } from "../config/envConfig"

export const tokenGen = (userId : any)=>{
    jwt.sign({
        userId : userId
    },
    envConfig.jwtSecretKey,
    {
        expiresIn : "7d"
    })
}