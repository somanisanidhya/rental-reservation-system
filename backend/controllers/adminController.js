const Vehicle=require("../models/Vehicle");
const Reservation=require("../models/Reservation");
const User=require("../models/user");
 const getDashboardStats=async(req,res)=>{
    try {
        const totaluser= await User.countDocuments();
        const totalvehicle= await Vehicle.countDocuments();
        const totalReservation=await Reservation.countDocuments();
        const reservation=await Reservation.find({
            status:"booked"
        })
        const totalRevenue =reservation.reduce((acc,reservation)=>{
            return acc+reservation.totalPrice;
        },0)
        return res.status(200).json({totaluser,totalvehicle,totalReservation,totalRevenue});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
 }
 module.exports={getDashboardStats}