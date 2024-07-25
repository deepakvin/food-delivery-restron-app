'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import {useState,useEffect} from 'react'

const EditFoodItem=(props) =>{

    console.log(props.params.id);
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [path,setPath]=useState("");
    const [description,setDescription]=useState("");
    const [error,setError]=useState(false);
    
    const router=useRouter();


    useEffect(()=>{
      handleLoadFoodItem();
      },[])
      const handleLoadFoodItem=async ()=>{
      let response=await fetch("http://localhost:3000/api/restaurant/foods/Edit/"+props.params.id);
      response=await response.json();
      if(response.success){
        console.log(response.result);
        setName(response.result.name);
        setPrice(response.result.price);
        setPath(response.result.path);
        setDescription(response.result.description);
      }
      }




const handleEditFoodItem=async ()=>{
 
    console.log(name,price,path,description);
    if(!name||!path||!description){
      setError(true);
      return false;

    }else{
      setError(false);

    }
    console.log(name,price,path,description);
    let response=await fetch("http://localhost:3000/api/restaurant/foods/Edit/"+props.params.id,{
      method:'PUT',
      body:JSON.stringify({name,price,path:path,description})
    });
    response=await response.json();
    if(response.success){
      
      router.push("../Dashboard/");
    }else{
      alert("data has not been updated");

    }

   
}



  return (
    <div className="container">
      <h1>update food items</h1>
      <div className="input-wrapper">
      <input type="text" className="input-field" placeholder="enter food name" 
      value={name} onChange={(e)=>setName(e.target.value)} />
      {
        error&&!name&&<span className="input-error">enter valid name</span>
      }


      </div>

      <div className="input-wrapper">
      <input type="text" className="input-field" placeholder="enter price" 
      value={price} onChange={(e)=>setPrice(e.target.value)} />
       {
        error&&!price&&<span className="input-error">enter valid price</span>
      }


      </div>

      <div className="input-wrapper">
      <input type="text" className="input-field" placeholder="enter image path" 
      value={path} onChange={(e)=>setPath(e.target.value)} />

{
        error&&!path&&<span className="input-error">enter valid path</span>
      }
      </div>

      <div className="input-wrapper">
      <input type="text" className="input-field" placeholder="enter description" 
      value={description} onChange={(e)=>setDescription(e.target.value)} />
 {
        error&&!description&&<span className="input-error">enter valid description</span>
      }
      
      </div>


      <div className="input-wrapper">
     <button onClick={handleEditFoodItem}>Edit food items</button>
      </div>
      <div className="input-wrapper">
     <button onClick={()=>router.push('../Dashboard')}>back to food items</button>
      </div>
    </div>
  )
}
export default EditFoodItem;