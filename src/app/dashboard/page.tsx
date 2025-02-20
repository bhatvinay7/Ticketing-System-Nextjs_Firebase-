'use client'
import React from 'react'
import {useState} from 'react'
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; 
import {auth} from '../../lib/firebaseConfig'
function Dashboard() {
  const router=useRouter()
  const [isLogOut,setIsLogout]=useState(false)
  async function handleSignOut(){
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
    } catch (error:any) {
      console.error("Error signing out:", error.message);
    }

  }
  return (
    <div className='w-full min-h-screen flex bg-green-200'>
           <div className='w-[250px] flex   h-full'>

           <div className='w-full bg-slate-100 border-r border-black/25 flex flex-col items-center gap-y-2  min-h-screen'>
           <div className=' w-32 text-violet-500/75 text-2xl p-2 ml-3 font-bold h-12'>TixBee</div>    
            <div className='mt-4 flex flex-col w-full '></div>
                 <div className=' flex w-full justify-start hover:bg-slate-200/60  p-2 gap-x-4 items-center'>
                <div className=" bg-dashboard w-6 h-6  bg-center bg-cover "></div> 
               <div className='w-fit  h-10 text-center text-black rounded-md' >Dashboard</div>
                </div>
              <div className=' flex w-full justify-start hover:bg-slate-200/60 p-2 gap-x-4 items-center'>
                
              <div className=" bg-ticket w-6 h-6 bg-center bg-cover"></div> 
               <div  className='w-fit  h-10 text-center  text-black rounded-md' >Raise Ticket</div>
                </div> 

                <div className=' flex w-full justify-start hover:bg-slate-200/60 p-2 gap-x-4 items-center'>
                <div className='bg-inbox w-6 h-6 bg-center bg-cover'></div>    
               <div className='w-fit  h-10 text-center  text-black rounded-md' >View Ticket</div>
                </div>  
                <div className=' flex w-full justify-start hover:bg-slate-200/60 p-2 gap-x-4 items-center'>
                <div className='bg-user w-6 h-6 bg-center bg-cover'></div>
               <div className='w-fit  h-10 text-center  text-black rounded-md' >Profile</div>
                </div>
                <div className=' flex w-full justify-start hover:bg-slate-200/60 p-2 gap-x-4 items-center'>
                <div className='bg-logout w-6 h-6 bg-center bg-cover' >
                  </div>
                <div  onClick={()=>{router.push("/login"),
                handleSignOut,setIsLogout(true)
              }

              }    className='w-fit  h-10 text-center hover:bg-slate-200/60  text-black rounded-md' >Logout</div>
                </div>

           </div>
             
           </div>
           <div className='w-full  min-h-screen bg-white h-full'>
            <div className='w-full relative h-16 p-2 flex justify-end bg-blue-100'>
              {isLogOut ?
            <div className='absolute h-12 rounded-sm bg-black/80 text-red-500 transition-all font-semibold delay-700 ease-in top-8 right-6 '></div>
              :<></>}
                <div className='w-12 h-12 mr-8 bg-white rounded-full'></div>
            </div>
           </div>

    </div>
  )
}

export default Dashboard