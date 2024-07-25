'use client'
import React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

const RestaurantLogin = () => {

const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [error,setError]=useState(false);
const router=useRouter();

const handleLogin=async ()=>{
  
  if(!email||!password){
    setError(true);
    return false;
  }else{
    setError(false);
    
  }
  let response= await fetch("http://localhost:3000/api/restaurant",{
    method:'POST',
    body:JSON.stringify({email,password,login:true})

  })
response=await response.json(); 
if(response.success){
const {result}=response;
delete result.password;
localStorage.setItem("restaurantUser",JSON.stringify(result));
router.push("/restaurant/Dashboard");


  alert("login successful");
}else{
  alert("login failed");
}



}

  return (
    <>
      <h3>login component</h3>
      <div>
      <div className="input-wrapper">
        <input type="text" placeholder="enter email id"  className="input-field" 
        value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        {
          error&&!email&&<span>enter valid email</span>
        }
      </div>
      <div className="input-wrapper">
        <input type="password" placeholder="enter password" className="input-field" 
        value={password} onChange={(e)=>setPassword(e.target.value)} 
        />
        {
          error&&!password&& <span>enter the valid password</span>
        }
      </div>
      <div>
        <button onClick={handleLogin} className="button">login</button>
      </div>

      </div>
    </>
  )
}

export default RestaurantLogin
