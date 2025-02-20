'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import {auth} from '../lib/firebaseConfig'
import { signOut } from "firebase/auth";

function Navigation() {
  async function handleSignOut(){
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (error:any) {
      console.error("Error signing out:", error.message);
    }

  }

    const router=useRouter()
  return (

 <nav className='w-[600px] flex justify-end  '>
         <div className=' list-none flex justify-end gap-x-4 w-full mr-8'>
          <button type="button" onClick={()=>{router.push("/")}} className='py-2 px-6 border border-black/10 rounded-md text-black bg-slate-300/80 '>Home</button>
          <button type="button"  onClick={()=>{router.push("/login")}} className='py-2 px-6 border  border-black/10 rounded-md text-black bg-slate-300/80 '>Sign In</button>
          {auth.currentUser ?
          <button type="button"  onClick={()=>{router.push("/login")
                                                handleSignOut()
 
          }} className='py-2 px-6 border  border-black/10 rounded-md text-black bg-red-400 '>Sign Out</button>:<></>}

         </div>
        </nav>
  
  )
}

export default Navigation