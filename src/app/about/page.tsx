'use client'
import React from 'react'
import {useState,useEffect} from 'react';
function About() {
    const [darkMode,setDarkMode]=useState(false)
    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
      }, [darkMode]);
  return (
    <>
    <div className='bg-white'>we are at about page</div>
    {/* <button className='p-2 rounded-md bg-white text-black ' onClick={()=>setDarkMode(!darkMode)} type="button">Click</button> */}
    </>
  )
}

export default About