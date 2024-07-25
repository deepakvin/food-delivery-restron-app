import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import  {mongoose}  from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/RestaurantsModel";

export async function POST(request){
    const payload=await request.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success=false;
    const orderObj=new orderSchema(payload);
    const result=await orderObj.save();
    if(result){
        success=true;
    }

    return NextResponse.json({result,success});

}

export async function GET(request){
    let userId=request.nextUrl.searchParams.get('id')
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success=false;

    let result=await orderSchema.find({user_id:userId});
    if(result){
        let restoData=await Promise.all(
            result.map(async (item)=>{
                let restoInfo={};
                restoInfo.Data=await restaurantSchema.findOne({_id:item.resto_id})
                restoInfo.amount=item.amount;
                restoInfo.Status=item.Status;
                return restoInfo;
            }
           
            
            )
           
        )
        result=restoData;
        success=true;
        
    }
   

    return NextResponse.json({result,success})
}