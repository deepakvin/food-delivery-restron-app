const { default: mongoose } = require("mongoose");

const deliverypartnersModel=new mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    
    city:String,
    address:String,
   

})
export const deliveryPartnersSchema=mongoose.models.deliverypartners||mongoose.model("deliverypartners",deliverypartnersModel);