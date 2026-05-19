const express=require("express");
const router=express.Router();
const {userregister,userlogin}=require("../controllers/authController")
router.post("/register",userregister);
router.post("/login",userlogin);
module.exports=router;