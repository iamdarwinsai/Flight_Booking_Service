const express=require("express");
const bodyParser=require("body-parser")

const {PORT}=require("./config/serverConfig")
const apiRoutes=require("./routes/index")
const db=require("./models/index")
const app=express();

const startServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))

    // db.sequelize.sync({alter:true})

    app.use("/api",apiRoutes)

    app.listen(PORT,()=>{
        console.log(`PORT SATRTED WORKING AT ${PORT}`);
    })
}

startServer();