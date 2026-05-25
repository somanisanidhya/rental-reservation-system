const express=require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv");
const authrouter = require("./routes/authRoute");
const userrouter = require("./routes/userRoute");
const vehiclerouter = require("./routes/vehicleRoute");
const reservationRoute =require("./routes/reservationRoute");
const adminRoute=require("./routes/adminRoute")
const port=4000;
const app=express();
app.use(express.json());
dotenv.config()
connectdb();
app.get("",(req,res)=>{
    res.send("api is running");
})
app.use("/api/auth",authrouter);
app.use("/api/user",userrouter);
app.use("/api/vehicle",vehiclerouter);
app.use("/api/reservation", reservationRoute);
app.use("/api/admin", adminRoute);
app.listen(port,()=>console.log(`server is running ${port}`));