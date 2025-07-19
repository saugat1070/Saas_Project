import { app } from "./src/main";
import { envConfig } from "./src/config/envConfig";
import "./src/database/connection";


(()=>{
    const portNumber = envConfig.portNumber;
    app.listen(portNumber,()=>{
        console.log(`server is started at ${portNumber}`)
    })
})();

