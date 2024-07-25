'use client'

import React from 'react'
import {useState} from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import dynamic from 'next/dynamic'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

function Page() {
let cartStore="";
    if(typeof window!=="undefined"){
        cartStore=JSON.parse(localStorage.getItem("cart"));

    }
const [cartStorage,setCartStorage]=useState(cartStore);
const [total]=useState(cartStorage.length==1?cartStorage[0].price:cartStorage.reduce((a,b)=>a.price+b.price))
const router=useRouter();

console.log(total);


const orderNow=()=>{
    if(JSON.parse(localStorage.getItem('user'))){
 router.push('/order');
    }else{
        router.push("/user-auth?order=true");
    }
   
}

  return (
    <div>
       <CustomerHeader  />
           
            <div className="food-item-wrapper">
                {
                 cartStorage.length>0?cartStorage.map((item)=>(
                        <div className="list-item">

                            <div className="list-item-block-1">
                                <img style={{width:100}} src={item.path} />
                            </div>

                           <div className="list-item-block-2">

                               <div>
                                {item.name}
                               </div>
                               <div>{item.price}</div>
                               <div className="description">{item.description}</div> 
                              {
                               
                                <button>remove from cart</button>
                                
                                 
                              }
                           </div>
                           <div className="list-item-block-3">Price :{item.price}</div>
                           


                        </div>
                    )):
                    <h1>no food items for this restaurant</h1>
                }
            </div>
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>food charges :</span>
                        <span>{total}</span>

                    </div>
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
                    
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>order by</button>
                </div>

            </div>
            <RestaurantFooter />
    </div>
  )
}

export default dynamic(()=>Promise.resolve(Page),{ssr:false});
