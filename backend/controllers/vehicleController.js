const Vehicle=require("../models/Vehicle")
const Reservation=require("../models/Reservation");
const fs=require("fs")
const addvehicle=async(req,res)=>{
    try {
        const {title,brand,type,pricePerDay,available}=req.body;
        const image =req.file? req.file.path: "";
    const vehicle=await Vehicle.create({
            title,
            brand,
            type,
            pricePerDay,
            image
    })
    return res.status(201).json({ message: "Vehicle added",vehicle})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}
const getvehicle=async(req,res)=>{
    try {
           const page=Number(req.query.page) || 1;
           const limit= Number(req.query.limit) || 5;
           const skip=(page-1)*limit;
           const filter={};
           if(req.query.brand){
            filter.brand=req.query.brand;
           }
            if(req.query.type){
            filter.type=req.query.type;
           }
           const sort=req.query.sort||"createdAt";
           const vehicle=await Vehicle.find(filter)
           .sort(sort)
           .skip(skip)
           .limit(limit);
           const total=await Vehicle.countDocuments();
          return res.status(200).json({
            total,
            currentPage: page,
            totalPages:
            Math.ceil(total / limit),
            vehicle})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const getvehiclebyid=async(req,res)=>{
    try {
         const vehicle=await Vehicle.findById(req.params.id);
           if (!vehicle) {

            return res.status(404).json({
                message: "Not found"
            });

        }
          return res.status(200).json(vehicle)

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const deletevehiclebyid=async(req,res)=>{
    try {
         const vehicle=await Vehicle.findById(req.params.id);
           if (!vehicle) {

            return res.status(404).json({
                message: "Not found"
            });

        }
        
        await Vehicle.findByIdAndDelete(req.params.id);
          return res.status(200).json({message:"vehicle deleted",vehicle})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const updatevehiclebyid=async(req,res)=>{
    try {
         const vehicle=await Vehicle.findById(req.params.id);
           if (!vehicle) {

            return res.status(404).json({
                message: "Not found"
            });

        }
       
        vehicle.title=req.body.title || vehicle.title;
        vehicle.brand=req.body.brand || vehicle.brand;
        vehicle.type=req.body.type || vehicle.type;
        vehicle.pricePerDay=req.body.pricePerDay || vehicle.pricePerDay;
        if(req.file){
           vehicle.image=req.file.path;
        }
         vehicle.available=req.body.available || vehicle.available;
         await vehicle.save();

          return res.status(200).json({message:"vehicle updated",vehicle})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const searchAvailableVehicles =async (req, res) => {

    try {

        const {startDate,endDate} = req.query;

        // Find overlapping reservations
        const reservations =
        await Reservation.find({

            status: "booked",

            startDate: {
                $lte: endDate
            },

            endDate: {
                $gte: startDate
            }

        });

        // Extract booked vehicle IDs
        const bookedVehicleIds =
        reservations.map(
            reservation =>
            reservation.vehicle
        );

        // Find available vehicles
        const vehicles =
        await Vehicle.find({

            _id: {
                $nin: bookedVehicleIds
            }

        });

        return res.status(200).json({
            vehicles
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
module.exports={
addvehicle,
getvehicle,
getvehiclebyid,
deletevehiclebyid,
updatevehiclebyid,
searchAvailableVehicles
}