const mongoose=require("mongoose");
const vehicleSchema=new mongoose.Schema({
       title:{
        type:String,
        required:true
       },
        brand:{
        type:String,
        required:true
       },
        type:{
        type:String,
        required:true
       },
        pricePerDay:{
        type:Number,
        required:true
       },
        image:{
        type:String,
        required:true
       },
       available:{
        type:Boolean,
        default:true
       },

},
{
    timestamps:true
})
const Vehicle=mongoose.model("Vehicle",vehicleSchema);
module.exports=Vehicle