import { useRouter } from 'next/navigation';
import React from 'react'
import {useEffect,useState} from 'react'
function FoodItemList() {

const [foodItems,setFoodItems]=useState("");
const router=useRouter();
useEffect(()=>{
loadFoodItems();
},[]);
const loadFoodItems=async ()=>{
  let resto_id;
const  restaurantData=await JSON.parse(localStorage.getItem("restaurantUser"));
console.log(restaurantData._id);
if(restaurantData){
  resto_id=restaurantData._id;
}
  let response=await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
  response=await response.json();
  console.log(response);
  if(response.success){
    setFoodItems(response.result);

  }else{
    alert("food item is not loading");

  }


}

const deleteFoodItem=async (id)=>{
let response=await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
  method:"delete"
})
response=await response.json();
if(response.success){
  loadFoodItems();
}else{
  alert("food items not deleted");
}


} 


    
  return (
    <div>
      food item list
      <table className="table">
        <thead>
            <tr>
                <td>S.N.</td>
                <td>Name</td>
                <td>Price</td>
                <td>Description</td>
                <td>Image</td>
                <td>operations</td>
            </tr>
        </thead>
        <tbody>
          {
            foodItems&&foodItems.map((item,key)=>(
              <tr key={key}>
              <td>{key+1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><img src={item.path}/></td>
              <td><button onClick={()=>deleteFoodItem(item._id)}>Delete</button><button onClick={()=>router.push('Dashboard/'+item._id)}>Edit</button></td>
          </tr>

            )


            )
          }
       
                
        </tbody>
      </table>
    </div>
  )
}

export default FoodItemList
