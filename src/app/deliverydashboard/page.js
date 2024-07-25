'use client'

import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";
import {useEffect,useState} from 'react'


const Page=()=>{
const router=useRouter();
const [myOrders,setMyOrders]=useState([]);

useEffect(()=>{
    getMyOrders();

},[])
const getMyOrders=async ()=>{
    const userStorage=JSON.parse(localStorage.getItem('user'))
    let response=await fetch("http://localhost:3000/api/order?id="+userStorage._id);
    response=await response.json();
    if(response.success){
        setMyOrders(response.result);

    }


}

    useEffect(()=>{
        const delivery=JSON.parse(localStorage.getItem('delivery'));
        if(delivery){
          router.push('/deliverydashboard');
    
        }
       
      })

    return (
        <div>
            <DeliveryHeader />
            <h1>My order list</h1>
            {

myOrders.map((item)=>(
    <div className="restaurant-wrapper" style={{marginLeft:'auto',marginRight:'auto'}}>
        <h4>Name :{item.Data.name}</h4>
        <div>amount :{item.amount}</div>
        <div>address:{item.Data.address}</div>
        <div>Status :{item.Status}</div>
        <div>update Status :<select>
            <option>confirm</option>
            <option>on the way</option>
            <option>delivered</option>
            <option>failed to delivery</option>
            </select>
        </div>

    </div>
))



}
        </div>
    )
}

export default Page;