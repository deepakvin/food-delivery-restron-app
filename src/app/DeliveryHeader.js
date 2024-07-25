'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";


const DeliveryHeader=(props)=>{



   


    return (
        <div className="header-wrapper">
            
            <div className="logo">
            <img className="img" src="https://blog.ipleaders.in/wp-content/uploads/2019/11/foodmitho.jpg" rel="abc"/>
               
            </div>
            <ul>
            <li>
                        <Link href="/">Home</Link>
                    </li>


                  
                </ul>
        </div>
    )
}
export default dynamic(()=>Promise.resolve(DeliveryHeader),{ssr:false});