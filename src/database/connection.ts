import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database : "smp_database",
    username : "root",
    password : "",
    host : "127.0.0.1",
    dialect:"mysql",
    port: 3306,
    models : [__dirname+"/model"]
});

sequelize.authenticate().then(()=>{
    console.log("Database is connected");
}).catch((err : Error)=>{
    console.log("Something error occur:"+err)
})

sequelize.sync({force:false,alter:false}).then(()=>{
    console.log("migrated successfully new changes")
})


export default sequelize;