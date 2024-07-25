
'use client'
import { useRouter } from "next/navigation";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import {useState,useEffect} from 'react'


export default function Home() {
  const [locations,setLocations]=useState([]);
  const [selectedLocation,setSelectedLocation]=useState('');
  const [showLocation,setShowLocation]=useState(false);
  const [restaurants,setRestaurants]=useState([]);
  const router=useRouter();

  
  
  
  
  

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

const loadLocations=async ()=>{
  let response=await fetch("http://localhost:3000/api/customer/location");
  response=await response.json();
  if(response.success){
    setLocations(response.result);
  }
}

console.log(locations);


const loadRestaurants=async (params)=>{
  let url="http://localhost:3000/api/customer";
  if(params?.location){
url=url+"?location="+params.location;

  }else if(params?.restaurant){
url=url+"?restaurant="+params.restaurant;
  }

  let response=await fetch(url);
  response=await response.json();
  if(response.success){
    setRestaurants(response.result);

  }
}
console.log(restaurants);

const handleListItem=(item)=>{
setSelectedLocation(item);
setShowLocation(false);
loadRestaurants({location:item})

}



  return (
    <main >
      <CustomerHeader />
      
      <div className="main-page-banner">
      <h1>Restaurant App</h1>
      <div className="input-wrapper">
        <input type="text" value={selectedLocation} onClick={()=>setShowLocation(true)} className="select-input" placeholder="select place" />
        <ul className="location-list">
       {
        showLocation&&locations.map((item)=>(
          <li onClick={()=>handleListItem(item)}>{item}</li>
        ))
       }
        </ul>



        <input type="text" onChange={(event)=>loadRestaurants({restaurant:event.target.value})} className="search-input" placeholder="enter restaurant name or food name" />
      </div>
      </div>

      <div className="restaurant-list-container">
        {
          restaurants.map((item)=>(
            <div onClick={()=>router.push('explore/'+item.name+"?id="+item._id)} className="restaurant-wrapper">
              <div className="heading-wrapper">
              <h1>{item.name}</h1>
              <h5>contact:{item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city}</div>
                <div className="address">{item.address},Email:{item.email}</div>

              </div>
            </div>
          ))
        }
      </div>
      <RestaurantFooter />
    </main>
  );
}
