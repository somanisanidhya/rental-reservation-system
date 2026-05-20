const Reservation = require("../models/Reservation");
const Vehicle = require("../models/Vehicle");

const createReservation=async(req,res)=>{
    try {
       const {vehicleId,startDate,endDate}=req.body;
       const vehicle=await Vehicle.findById(vehicleId);
       if(!vehicle){
        return res.status(404).json({message:"vehicle not found"});
       }
       const start=new Date(startDate);
       const end=new Date(endDate);
       const days = (end - start) / (1000 * 60 * 60 * 24);
       if(days<=0){
        return res.status(400).json({message:"invalid booking dates"})
       }
       const existingReservation=await Reservation.findOne({
               vehicle:vehicleId,
               status:"booked",
               startDate:{
                   $lte: endDate
               },
                endDate: {
                    $gte: startDate
                }
       });
       if (existingReservation) {

            return res.status(400).json({
                message:
                    "Vehicle already booked for selected dates"
            });

        }
       const totalPrice=days*vehicle.pricePerDay;
       const reservation=await Reservation.create({
            user:req.user.id ,
            vehicle:vehicleId,
            startDate,
            endDate,
            totalPrice
            
            })
            return res.status(201).json({message:"reservation created"});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
module.exports={createReservation};