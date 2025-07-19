import dotenv from "dotenv";



dotenv.config();

export const envConfig = {
    portNumber : process.env.PORT_NUMBER,
    sessionSecret : process.env.SESSION_SECRET_KEY as string,
    jwtSecretKey : process.env.JWT_SECRET_KEY as string
}