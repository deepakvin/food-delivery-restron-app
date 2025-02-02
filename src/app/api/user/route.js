import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { userSchema } from "@/app/lib/userModel";

export async function POST(request){
const payload=await request.json();
let success=false;
await mongoose.connect(connectionStr,{useNewUrlParser:true});
const user=new userSchema(payload);
const result=await user.save();
if(result){
    success=true;
}


return NextResponse.json({success,result});

}