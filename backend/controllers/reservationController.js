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
const getUserReservations = async (req, res) => {

    try {

        const reservations =
            await Reservation.find({

                user: req.user.id

            })
            .populate("vehicle");

        return res.status(200).json({
            reservations
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
const cancelReservation = async (req, res) => {

    try {

        const reservation =
            await Reservation.findById(req.params.id);

        if (!reservation) {

            return res.status(404).json({
                message: "Reservation not found"
            });

        }

        if (
            reservation.user.toString()
            !==
            req.user.id
        ) {

            return res.status(401).json({
                message: "Not authorized"
            });

        }

        reservation.status = "cancelled";

        await reservation.save();

        return res.status(200).json({

            message:
            "Reservation cancelled",

            reservation

        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
module.exports={createReservation,getUserReservations,cancelReservation};