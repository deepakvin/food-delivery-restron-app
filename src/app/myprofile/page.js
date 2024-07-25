
'use client'
import {useState,useEffect} from 'react'
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Page=()=>{

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

console.log(myOrders);


    return (
        <div>
            <CustomerHeader />
            <h1>my profile</h1>
            {

                myOrders.map((item)=>(
                    <div className="restaurant-wrapper" style={{marginLeft:'auto',marginRight:'auto'}}>
                        <h4>Name :{item.Data.name}</h4>
                        <div>amount :{item.amount}</div>
                        <div>address:{item.Data.address}</div>
                        <div>Status :{item.Status}</div>

                    </div>
                ))



            }
            
              




            <RestaurantFooter />
        </div>
    )
}

export default Page;