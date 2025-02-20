import React from 'react'
import NavBar from './Navigation'
function Header() {
  return (
    <header className='h-24 bg-slate-200 border w-full flex justify-between items-center border-b-black/10  shadow-sm shadow-black/10'>
    <div className=' w-32 text-violet-500/75 text-4xl ml-3 font-bold h-12'>TixBee</div>    
    <NavBar/>

    </header>
  )
}

export default Header