'use client'

import RestaurantHeader from "@/app/_components/RestaurantHeader";

import './../style.css'
import AddFoodItem from "@/app/_components/AddFoodItem";
import {useState} from 'react'
import FoodItemList from "@/app/_components/FoodItemList";


export default function page() {
  const [addItem,setAddItem]=useState(false);
  return (
    <div>
      <RestaurantHeader />
      <button onClick={()=>setAddItem(true)}>add items</button>
      <button onClick={()=>setAddItem(false)}>dashboard</button>
     

      {
         addItem?<AddFoodItem setAddItem={setAddItem}/>:<FoodItemList />

      }
    
    </div>
  )
}
