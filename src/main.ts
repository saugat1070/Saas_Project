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
        secure : false
    }
}))

app.use("/v1/api/auth",authRoute);