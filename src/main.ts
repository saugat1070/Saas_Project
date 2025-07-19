import express, { Application } from "express";
import session from "express-session"
import { envConfig } from "./config/envConfig";
import authRoute from "./Routes/auth.Route"
export const app : Application = express()

app.use(express.json());
app.use(session({
    secret : envConfig.sessionSecret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        secure : false,
        maxAge : 24 * 60 * 60 * 1000
    }
    
}))

app.use("/v1/api/auth",authRoute);