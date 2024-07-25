
'use client'

import img from 'next/image'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {useState,useEffect} from 'react'


export default function RestaurantHeader() {

  const [details,setDetails]=useState();
  const router=useRouter();
  const pathName=usePathname();


  useEffect(()=>{
    let data=localStorage.getItem("restaurantUser");
    if(!data&&pathName=="/restaurant/Dashboard"){
      router.push("/restaurant")
    }else if(data && pathName=="/restaurant"){
      router.push("/restaurant/Dashboard");

    }
    else{

      
      
        setDetails(JSON.parse(data));
    }
  },[])

  const logout=()=>{
    localStorage.removeItem("restaurantUser");
    router.push('/restaurant');

  }




  return (
    <div className="header-wrapper">
      <div className="logo">
         <img className="img" src="https://blog.ipleaders.in/wp-content/uploads/2019/11/foodmitho.jpg" rel="abc"/>
      </div>
      <div>
        <ul>
            <li>
                <Link href="/">home</Link>
            </li>

            {
              details&&details.name? 
              
              <>
              <li><button onClick={logout}>logout</button></li>
              <li>
              <Link href="/">profile</Link>
          </li>
              </>
          : 
          <li>
                <Link href="/">login/signup</Link>
            </li>

            



            }

           
           

           
        </ul>
      </div>
    </div>
  )
}
