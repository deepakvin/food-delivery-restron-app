import React from 'react'
import {useState} from 'react'

export default function AddFoodItem(props) {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [path,setPath]=useState("");
    const [description,setDescription]=useState("");
    const [error,setError]=useState(false);



const handleFoodItem=async ()=>{
    console.log(name,price,path,description);
    if(!name||!path||!description){
      setError(true);
      return false;

    }else{
      setError(false);

    }
    let resto_id;
const  restaurantData=await JSON.parse(localStorage.getItem("restaurantUser"));
console.log(restaurantData._id);
if(restaurantData){
  resto_id=restaurantData._id;
}

    let response=await fetch("http://localhost:3000/api/restaurant/foods",{
      method:"POST",
      body:JSON.stringify({name,price,path:path,description,resto_id})


    })
    response=await response.json();
    console.log(response);
    if(response.success){
      alert("food item added");
      props.setAddItem(false);

    }else{
      alert("food item is not added")
    }
}


  return (
    <div className="container">
      <h1>Add new food items</h1>
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
     <button onClick={handleFoodItem}>add food items</button>
      </div>
    </div>
  )
}
