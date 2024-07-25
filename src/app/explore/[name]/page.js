
'use client'

import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import {useEffect,useState} from 'react'

const Page=(props)=>{
    const name=props.params.name;
    const [restaurantDetails,setRestaurantDetails]=useState("");
    const [foodItems,setFoodItems]=useState([]);
    const [cartData,setCartData]=useState();
    let cartStore="";
    if(typeof window!=="undefined"){
         cartStore=JSON.parse(localStorage.getItem('cart'));
    }
    
    const [cartStorage,setCartStorage]=useState(cartStore);
    const [cartIds,setCartIds]=useState(cartStorage?()=>cartStorage.map((item)=>{
        return item._id;
    }):[]);
   
   const [removeCartData,setRemoveCartData]=useState();
    

useEffect(()=>{
    loadRestaurantDetails();
},[])


    const loadRestaurantDetails=async ()=>{
        const id=props.searchParams.id;
        console.log(id);
        let  response=await fetch("http://localhost:3000/api/customer/"+id);
        response=await response.json();
        if(response.success){
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
        }
      
      }
      console.log(restaurantDetails);
      console.log(foodItems);

const addToCart=(item)=>{
    
    let localCartIds=cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setCartData(item);
    setRemoveCartData();

}
const removeFromCart=(id)=>{
setRemoveCartData(id);
let localIds=cartIds.filter(item=>item!=id);
setCartData();
setCartIds(localIds);
}

    return(
        <div className="restaurant-page-banner">
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <h1>{decodeURI(name)}</h1>
            <div className="detail-wrapper">
                <h4>contact:{restaurantDetails?.contact}</h4>
                <h4>city:{restaurantDetails?.city}</h4>
                <h4>address:{restaurantDetails?.address}</h4>
                <h4>contact:{restaurantDetails?.contact}</h4>
                <h4>email:{restaurantDetails?.email}</h4>
            </div>
            <div className="food-item-wrapper">
                {
                 foodItems.length>0?foodItems.map((item)=>(
                        <div className="list-item">

                            <div>
                                <img style={{width:100}} src={item.path} />
                            </div>

                           <div >

                           <div>
                                {item.name}
                            </div>
                            <div>{item.price}</div>
                            <div className="description">{item.description}</div> 
                            {
                                cartIds.includes(item._id) ? 
                                <button onClick={()=>removeFromCart(item._id)}>remove from cart</button>
                                : <button onClick={()=>addToCart(item)}>add to cart</button>
                                 
                            }
                           
                            
                           </div>
                           


                        </div>
                    )):
                    <h1>no food items</h1>
                }
            </div>
            <RestaurantFooter />
        </div>
    )
}
export default Page;