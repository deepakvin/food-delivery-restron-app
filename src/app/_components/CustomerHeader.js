'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";


const CustomerHeader=(props)=>{



    const userStorage=JSON.parse(localStorage.getItem('user'));
    console.log(userStorage);
    let cartStorage="";
    if(typeof window!=="undefined"){
         cartStorage=JSON.parse(localStorage.getItem('cart'));
    }
    
    const [user,setUser]=useState(userStorage?userStorage:undefined);
    const [cartNumber,setCartNumber]=useState(cartStorage?.length);
    const [cartItem,setCartItem]=useState(cartStorage);
    const router=useRouter();
    

    useEffect(()=>{
        
       if(props.cartData){
        console.log(props);
        if(cartNumber){
            if(cartItem[0].resto_id!=props.cartData.resto_id){
                localStorage.removeItem('cart');
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem('cart',JSON.stringify([props.cartData]));

            }else{
                let localCartItem=cartItem;
                localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                setCartItem(localCartItem);
                setCartNumber(cartNumber+1);
                localStorage.setItem('cart',JSON.stringify(localCartItem));
            }
           


        }else{
            setCartNumber(1);
            setCartItem([props.cartData]);
            localStorage.setItem('cart',JSON.stringify([props.cartData]));
        }

        
       }
       

    },[props.cartData])

  
useEffect(()=>{
    if(props.removeCartData){
        let localCartItem=cartItem.filter((item)=>{
            return item._id!=props.removeCartData;
        })
        setCartItem(localCartItem);
        setCartNumber(cartNumber-1);
        localStorage.setItem('cart',JSON.stringify(localCartItem));
        if(localCartItem.length==0){
            localStorage.removeItem('cart');
        }
    }

},[props.removeCartData]);
useEffect(()=>{
    if(props.removeCartData){
        setCartItem([])
setCartNumber(0);
localStorage.removeItem('cart');

    }

},[props.removeCartData])

const logout=()=>{
    localStorage.removeItem('user');
    router.push('/user-auth');
}


    return (
        <div className="header-wrapper">
            
            <div className="logo">
            <img className="img" src="https://blog.ipleaders.in/wp-content/uploads/2019/11/foodmitho.jpg" rel="abc"/>
               
            </div>
            <ul>
            <li>
                        <Link href="/">Home</Link>
                    </li>


                   {user?<>
                   <li>
                   <Link href="/myprofile">{user?.name}</Link>

                   </li>
                   <li><button onClick={logout}>logout</button></li>


                   </>
                    :
                    <>
                   <li> 
                        <Link href="/">Login</Link>
                    </li>
                    <li>
                        <Link href="/user-auth">SignUp</Link>
                    </li>
                   </>







                   }


                    <li>
                        <Link href={cartNumber?"/cart":"#"}>cart({cartNumber?cartNumber:0})</Link>
                    </li>
                    <li>
                        <Link href="/">Add Restaurant</Link>
                    </li>
                    <li>
                        <Link href="/deliverypartner">Delivery Partner</Link>
                    </li>
                </ul>
        </div>
    )
}
export default dynamic(()=>Promise.resolve(CustomerHeader),{ssr:false});