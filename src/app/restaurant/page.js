'use client'

import RestaurantFooter from "../_components/RestaurantFooter";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import './style.css'

import {useState} from 'react'


const Restaurant=()=>{
    const [login,setLogin]=useState(true);
    return (

        <>

        <div className="container">
            <RestaurantHeader />
        <h1>Restaurant Login/SignUp page</h1>
        {
            login? <RestaurantLogin />: <RestaurantSignUp />
        }
       
        <button  onClick={()=>setLogin(!login)}>
             {login?"do not have account?sign up": "already have account?sign in" }
             </button>
        </div>
       <RestaurantFooter />
             
        </>


    )
   
}
export default  Restaurant;