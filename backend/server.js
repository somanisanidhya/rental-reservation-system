const express=require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv");
const authrouter = require("./routes/authroute");
const port=4000;
const app=express();
app.use(express.json());
dotenv.config()
connectdb();
app.get("",(req,res)=>{
    res.send("api is running");
})
app.use("/api/auth",authrouter);
app.listen(port,()=>console.log(`server is running ${port}`));