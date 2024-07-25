import { connectionStr } from '@/app/lib/db';
import { foodsSchema } from '@/app/lib/foodsModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';


export  async function GET(request,content){
    const id=content.params.id;
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result=await foodsSchema.findOne({_id:id});
    if(result){
        success=true;
    }
    return NextResponse.json({result,success});


}
//update data according to id
export async function PUT(request,content){
    const id=content.params.id;
    const payload=await request.json();
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result=await foodsSchema.findOneAndUpdate({_id:id},payload);
    if(result){
        success:true;
    }
    return NextResponse.json({result,success:true});

}
