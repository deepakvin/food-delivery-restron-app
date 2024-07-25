import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";


export async function POST(request){
const payload=await request.json();
let success=false;
await mongoose.connect(connectionStr,{useNewUrlParser:true});
const deliverypartners=new deliveryPartnersSchema(payload);
const result=await deliverypartners.save();
if(result){
    success=true;
}


return NextResponse.json({success,result});

}