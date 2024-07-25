'use client'

import React from 'react'
import {useState,useEffect} from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import dynamic from 'next/dynamic'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import {useRouter} from 'next/navigation'

function Page() {
let cartStore="";
    if(typeof window!=="undefined"){
        cartStore=JSON.parse(localStorage.getItem("cart"));

    }
    const [userStorage,setUserStorage]=useState(JSON.parse(localStorage.getItem('user')));
const [cartStorage,setCartStorage]=useState(cartStore);
const [total]=useState(cartStorage?.length==1?cartStorage[0].price:cartStorage?.reduce((a,b)=>a.price+b.price))




console.log(total);
const [removeCartData,setRemoveCartData]=useState(false);
const router=useRouter();
useEffect(()=>{
    if(!total){
        router.push('/');
    }
    },[total])

const orderNow=async ()=>{
    let user_id=JSON.parse(localStorage.getItem('user'))._id;
    let city=JSON.parse(localStorage.getItem('user')).city;



    let cart=JSON.parse(localStorage.getItem('cart'));
    let resto_id=cart[0].resto_id;
    let foodItemIds=cart.map((item)=>item._id).toString();
    let deliveryBoyResponse=await fetch("http://localhost:3000/api/deliverypartners/"+city);
    deliveryBoyResponse=await deliveryBoyResponse.json();
    
    let deliveryBoysIds= deliveryBoyResponse?.result?.map((item)=>item._id);
    let deliveryBoy_id= deliveryBoysIds[Math.floor(Math.random()*deliveryBoysIds.length)];
    console.log(deliveryBoy_id);
    if(!deliveryBoy_id){
        alert("delivery partner is not available");
        return false;
    }
   

    


    let collection={
        user_id,
        resto_id,
        foodItemIds,
        deliveryBoy_id,
        Status:'confirm',
        amount:total+DELIVERY_CHARGES+(total*TAX/100),



    }
    let response=await fetch("http://localhost:3000/api/order",{
        method:"POST",
        body:JSON.stringify(collection)

    });
    response=await response.json();
    if(response.success){
        alert("order confirmed");
        setRemoveCartData(true);
        router.push('/myprofile');
    }else{
        alert("order failed");
    }

    console.log(collection);
}



  return (
    <div>
       <CustomerHeader removeCartData={removeCartData} />
           
          
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User details</h2>
                    <div className="row">
                        <span>name :</span>
                        <span>{userStorage.name}</span>

                    </div>
                    <div className="row">
                        <span>address :</span>
                        <span>{userStorage.address}</span>

                    </div>
                    <div className="row">
                        <span>mobile:</span>
                        <span>{userStorage.mobile}</span>

                    </div>
                    <h2>Amount details</h2>
                    <div className="row">
                        <span>TAX :</span>
                        <span>{total*TAX/100}</span>

                    </div>
                    <div className="row">
                        <span>delivery charges</span>
                        <span>{DELIVERY_CHARGES}</span>

                    </div>
                    <div className="row">
                        <span>total prices</span>
                        <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>

                    </div>
                    <h2>Amount method</h2>
                    <div className="row">
                        <span>cash on delivery </span>
                        <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>

                    </div>
                    
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>place on your order Now</button>
                </div>

            </div>
            <RestaurantFooter />
    </div>
  )
}

export default dynamic(()=>Promise.resolve(Page),{ssr:false});
