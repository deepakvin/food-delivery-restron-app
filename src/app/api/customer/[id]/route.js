import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/RestaurantsModel";
import { NextResponse } from "next/server";
import  mongoose  from "mongoose";
import { foodsSchema } from "@/app/lib/foodsModel";

export async function GET(request,content){
console.log(content.params.id);
const id=content.params.id;
await mongoose.connect(connectionStr,{useNewUrlParser:true});
const details=await restaurantSchema.findOne({_id:id});
const foodItems=await foodsSchema.find({resto_id:id})
return NextResponse.json({success:true,details,foodItems}); 
}