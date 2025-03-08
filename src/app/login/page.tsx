"use client";
import axios from "axios";
import Link from "next/link"
import { useState,useEffect } from "react";
import { signInWithPopup,onAuthStateChanged } from "firebase/auth";
import {login,userStatus} from '../../redux/authSlice/auth'
import { auth, googleAuthProvider,faceBookAuthjProvider } from "../../lib/firebaseConfig"; // Import Firebase config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import Header from "@/components/Header";
import {useSelector} from 'react-redux'
import { useRouter } from "next/navigation";



export default function LoginForm() {

  const router=useRouter();
 
  const user=useSelector(userStatus)
  const [state,setState]=useState() 
 

  const [userauth,setAuth]=useState<any>("")
  const [newuser, setUser] = useState<{email:string,password:string}>({email:"",password:""});
  console.log(user)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth(newuser)
    
  };
  

    useEffect(() => {
      async function postData(){
        
      if(userauth){
      
        const response= await axios.post('http://localhost:3000/api/login',JSON.stringify(userauth))
        if(user){

          router.push('/user/dashboard')
        }
      }

      }
      try{

        postData()

      }
      catch(error:any){
        console.log(error)
      }
      finally{
      
      }
    },[userauth,newuser])
    
   

   

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user; // User info
      const token = await user.getIdToken(true);
      setAuth(user)
    } catch (error:any) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleFaceBookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, faceBookAuthjProvider);
      const user = result.user; // User info
      setAuth(user)
    } catch (error:any) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <>

    <Header/>
    <div className=" min-h-screen flex items-center relative md:top-24 top-16 justify-center bg-blue-200/45 p-2 ">
      <div className=" bg-white/75 p-6 border-2 border-gray-100 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800/75 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Email Field */}

          <button  onClick={handleGoogleLogin} type="button" className="w-full  mb-6 text-black/65 border shadow shadow-cyan-200 border-indigo-500  rounded-md font-semibold bg-white py-1  flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <span className=" bg-googleImage bg-center bg-cover mr-3 z-[24] w-8 h-8"></span> Login with Google
        </button>   
        <button  onClick={handleFaceBookLogin} type="button" className="w-full  text-black/65 border border-indigo-500 shadow shadow-cyan-200  rounded-md font-semibold bg-white py-1  flex items-center  justify-center gap-2 hover:bg-gray-100 transition">
          <FontAwesomeIcon className="  text-blue-500  z-[24] w-8 h-7" icon={faFacebook} /> Login with Facebook
        </button>   
        
             
        <div className="text-center items-center flex mt-4 mb-2 text-gray-500">
        <div className="flex-grow border-t-2 border-gray-400"></div>
  <span className="mx-4 text-gray-500">OR</span>
  <div className="flex-grow border-t-2  border-gray-400"></div>
        
 
</div>

          <div className="mb-2">
            <label  htmlFor="email" className="block text-gray-700">Email ID</label>
            <input
              id="email"
              type="email"
              value={newuser.email}
              name="email"
              placeholder="email id"
              onChange={(e) => setUser({...newuser,[e.target.name]:e.target.value})}
              className="w-full mt-1 p-2 text-black outline-none border-purple-900 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
              />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={newuser.password}
              placeholder="password"
              onChange={(e) => setUser({...newuser,[e.target.name]:e.target.value})}
              className="w-full mt-1 p-2 border text-black outline-none border-purple-900 rounded-md focus:ring-2 focus:ring-blue-400"
              required
              />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-violet-700 border-2 border-white text-white font-semibold py-2 rounded-md  transition"
            >
            Login
          </button>
        </form>

         <div className="w-full p-2 flex justify-center mt-2 items-center">
          <p className="text-slate-700 mr-2">Don&#39;t have an account?</p>
        <span className="text-blue-400"><Link href='/signup'>Sign Up</Link></span> 

         </div>
      
        
      </div>
    </div>
            </>
  );
}
