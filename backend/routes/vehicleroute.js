const express=require("express");
const router=express.Router();
const protect=require("../middilware/authMiddleware");

const {addvehicle,getvehicle,getvehiclebyid,deletevehiclebyid,updatevehiclebyid}=require("../controllers/vehicleController");
router.post("/add",protect,addvehicle);
router.get("/get",protect,getvehicle);
router.get("/get/:id",protect,getvehiclebyid);
router.delete("/delete/:id",protect,deletevehiclebyid);
router.patch("/update/:id",protect,updatevehiclebyid);
module.exports=router;