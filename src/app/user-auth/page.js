'use client'
import {useState} from 'react'
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserLogin from "../_components/UserLogin";


import UserSignUp from "../_components/UserSignUp";




const UserAuth=(props)=>{
    const [login,setLogin]=useState(true);
    console.log('order flag',props);
    return (
        <div>
            <CustomerHeader />
            <div className="container">
            <h2>{login?'User login':'signUp'}</h2>
            {

                login?<UserLogin redirect={props.searchParams} />:<UserSignUp redirect={props.searchParams} />
            }
            <button className="button-Link" onClick={()=>setLogin(!login)} >
                {login?"do not have account?,sign up":"already have an account,login it"}
            </button>
            
            
            
           

            </div>

           
            <RestaurantFooter />
            
        </div>
    )
}

export default UserAuth;