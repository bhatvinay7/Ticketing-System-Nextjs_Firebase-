'use client'
//export const dynamic=true
import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {auth} from '../../lib/firebaseConfig'
import Header from "@/components/Header";
import Link from 'next/link'
function SignUp() {
  interface User{
    userName:string,
    email:string,
    password:string
  }
  console.log(auth.currentUser)
  const [data,setData]=useState<User>({userName:'',email:'',password:''})
  const [error,setError]=useState<errorData[]>()
  const [response,setResponse]=useState()
  async function  handleSubmit(e:React.FormEvent){
    e.preventDefault()
    try{
       const response= await axios.post('http://localhost:3000/api/signup',JSON.stringify(data))
        setResponse(response.data.message)
    }   
    catch(error:any){
      console.log(error.response.data)
     if(error.response.data?.message){
      setError([{field:'',message:error.response.data.message}])
     }
     else{
      
       const errorInfo = Object.entries(error.response.data?.error as ZodErrorResponse)
         .filter(([key, value]) => key !== "_errors" && (value._errors.length ?? 0) > 0)
         .map(([key, value]) =>({ field: key, message: value._errors[0] }));
              setError(errorInfo)
         }

     }
    finally{
      setTimeout(()=>{
        setError(undefined)
        setResponse(undefined)
      },5000)
    }
  }
  
  return(
       <>
        <Header/>
      <div className=" min-h-screen relative md:top-24 top-16 flex flex-col gap-8 items-center justify-center   bg-blue-300/45 p-2 ">
             
            <div className=' w-full p-6  lg:w-1/2 absolute top-4 bg-blue-200/20  bg-contain sm:w-3/5 sm:left-60 lg:left-1/2 lg:bg-cover  bg-no-repeat h-[600px] rounded-3xl bg-signUpImage  '></div>

            {response ?<div className='w-full transition-all h-16 lg:h-24 delay-300 ease-in bg-green-200/60 absolute z-[35] top-0 rounded-md gap-x-3 flex justify-center items-center p-4 gap-y-1 '>
                    <span className='bg-circleCheck bg-contain w-8 h-8 bg-center'></span>
                    <p className='text-green-500 font-semibold text-base'>{response}</p>
            </div>:<></>}
            {error ?
             <div className='w-full h-auto absolute z-[35] min-h-20 top-0 bg-red-200/45 rounded-md flex flex-col p-4 gap-y-1 '>
             {error ? error.map((each,index)=>{
               return(
                 <div key={index} className='w-full text-red-500 h-auto '>{`* ${each.field} - ${each.message}`}</div>
                )
              }):<></>}
             </div>
             :<></>}
            <div className=" z-[34]  relative border-2 border-violet-700/25 border-l-4 box-border border-l-white/75 bg-gradient-to-b from-slate-50 to-blue-200/45 p-6 rounded-lg shadow-lg w-full backdrop-blur-sm  max-w-[360px]">
              <h2 className="text-2xl font-semibold text-gray-800 text-start">Sign UP</h2>
      
              <form onSubmit={handleSubmit} className="mt-4 ">
                {/* Email Field */}
      
                 
                <div className="mb-2">
                  <label  htmlFor="UserName" className="block text-gray-700">User Name</label>
                  <input
                    id="UserName"
                    type="text"
                    placeholder='username'
                    value={data.userName}
                    onChange={(e) => setData({...data,userName:e.target.value })}
                    className="w-full mt-1 p-2 border-blue-400 border-2 text-black rounded-md focus:ring-2 focus:ring-blue-400"
                    
                    />
                </div>  
            
      
                <div className="mb-2">
                  <label  htmlFor="email" className="block text-gray-700">Email ID</label>
                  <input
                    id="email"
                    type="email"
                    placeholder='email id'
                    value={data.email}
                    onChange={(e) => setData({...data,email:e.target.value})}
                    className="w-full mt-1 p-2 border-blue-400 o border-2 text-black rounded-md focus:ring-2 focus:ring-blue-400"
                    
                    />
                </div>
      
                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    
                    value={data.password}
                    placeholder="password"
                    onChange={(e) => setData({...data,password:e.target.value})}
                    className="w-full mt-1 p-2 border-blue-400 border-2 text-black rounded-md focus:ring-2 focus:ring-blue-400"
      
                  />
                </div>
      
                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r mt-4 from-slate-900/75 to-slate-900/75 hover:bg-gray-400 border border-purple-700 text-white font-semibold py-2 rounded-md  transition"
                >
                  Sign Up
                </button>
              </form>
              <div className='w-full mt-2 flex justify-start'>
               <p className='mr-2 text-slate-900 text-base '>Already hava a account ?  </p><Link className='text-blue-500 text-base' href="/login">Go to Login</Link>

              </div>
      
              {/* OR Divider */}
              
          
      
      
            </div>
          </div>
                    </>
  )
}

export default SignUp