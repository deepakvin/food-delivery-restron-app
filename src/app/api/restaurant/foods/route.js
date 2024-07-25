import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { foodsSchema } from "@/app/lib/foodsModel";
import { connectionStr } from "@/app/lib/db";

export async function POST(request){
const payload=await request.json();
await mongoose.connect(connectionStr,{useNewUrlParser:true});
const food=new foodsSchema(payload);
const result=await food.save();
return NextResponse.json({result,success:true});

}