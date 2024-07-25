
'use client'
import React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/navigation'


const RestaurantSignUp = () => {
  const router=useRouter();
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [c_password,setC_password]=useState("");
const [name,setName]=useState("");
const [city,setCity]=useState("");
const [address,setAddress]=useState("");
const [contact,setContact]=useState("");
const [error,setError]=useState(false);
const [passwordError,setPasswordError]=useState(false);


 const handleSignup=async ()=>{
  if(password!==c_password){
    setPasswordError(true);
    return false;
  }else{
    setPasswordError(false);
  }

  if(!email||!password||!c_password||!name||!city||!address||!contact){
    setError(true);
    return false;
  }else{
    setError(false);
  }

  
  console.log(email,password,c_password,name,city,address,contact)
  
let response=await fetch("http://localhost:3000/api/restaurant",{
  method:"POST",
  body:JSON.stringify({email,password,name,city,address,contact})


})
 response=await response.json();
console.log(response);
if(response.success){
  alert("data successfully registered")
  console.log(response);
  const {result}=response;
  delete result.password;
  localStorage.setItem("restaurantUser",JSON.stringify(result));
  router.push("/restaurant/Dashboard")
  
}



 }







  return (
    <>
    <h3>sign up here</h3>
       <div>
      <div className="input-wrapper">
        <input type="text" placeholder="enter email id"  className="input-field"
        value={email} onChange={(event)=>setEmail(event.target.value)} />
        {

          error&&!email && <span>please enter valid email</span>
        }



      </div>
      <div className="input-wrapper">
        <input type="password" placeholder="enter password" className="input-field"
         value={password} onChange={(event)=>setPassword(event.target.value)} />


         {
          passwordError&&<span className="input-error">Password and confirm password not match</span>
         }

          {

             error&&!password&& <span>please enter valid password</span>
          }
      </div>

      <div className="input-wrapper">
        <input type="password" placeholder="confirm password" className="input-field" 
         value={c_password} onChange={(event)=>setC_password(event.target.value)}/>



         
          {
            passwordError&&<span className="input-error">Password and confirm password not match</span>
           }
            {

              error&&!c_password&& <span>please enter valid confirm password</span>
            }
         
      </div>

      <div className="input-wrapper">
        <input type="text" placeholder="enter restaurant name" className="input-field" 
         value={name} onChange={(event)=>setName(event.target.value)}/>
          {

error&&!name&& <span>please enter valid name</span>
}
      </div>

      <div className="input-wrapper">
        <input type="text" placeholder="enter city" className="input-field" 
         value={city} onChange={(event)=>setCity(event.target.value)}/>
          {

error&&!city&& <span>please enter valid city</span>
}
      </div>

      <div className="input-wrapper">
        <input type="text" placeholder="enter full address" className="input-field" 
         value={address} onChange={(event)=>setAddress(event.target.value)}/>
          {

error&&!address&& <span>please enter valid address</span>
}
      </div>

      <div className="input-wrapper">
        <input type="Number" placeholder="enter contact number address" className="input-field" 
         value={contact} onChange={(event)=>setContact(event.target.value)}/>
          {

error&&!contact&& <span>please enter valid contact number</span>
}
      </div>

      <div>
        <button className="button" onClick={handleSignup}>sign up</button>
      </div>

      </div>
    </>

  )
}

export default RestaurantSignUp
