import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/RestaurantsModel";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const data=await restaurantSchema.find();
    console.log(data);



    return NextResponse.json({data})
}

export async function POST(request){
    const payload=await request.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let result;
    let success=false;
    if(payload.login){
        //login code here
        result=await restaurantSchema.findOne({email:payload.email,password:payload.password})
        if(result){
            success=true;
        }

    }else{
        //use it for sign up
        
    const restaurant=new  restaurantSchema(payload);
      result=await restaurant.save();
      if(result){
        success=true;
    }

    }

    
   
    
    return NextResponse.json({result,success});
}