const Vehicle=require("../models/Vehicle")

const addvehicle=async(req,res)=>{
    try {
        const {title,brand,type,pricePerDay,image,available}=req.body;
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
         const vehicle=await Vehicle.find();
           if (vehicle.length === 0) {

            return res.status(404).json({
                message: "No vehicles found"
            });

        }
          return res.status(200).json(vehicle)

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
         const vehicle=await Vehicle.findByIdAndDelete(req.params.id);
           if (!vehicle) {

            return res.status(404).json({
                message: "Not found"
            });

        }
          return res.status(200).json({message:"vehicle deleted",vehicle})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const updatevehiclebyid=async(req,res)=>{
    try {
         const vehicle=await Vehicle.findByIdAndUpdate(req.params.id,req.body,{new:true});
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
module.exports={
addvehicle,
getvehicle,
getvehiclebyid,
deletevehiclebyid,
updatevehiclebyid
}