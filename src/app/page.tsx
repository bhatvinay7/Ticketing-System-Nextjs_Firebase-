
// import {db} from './firebaseConfig'
// import {collection,addDoc} from 'firebase/firestore'
// import React,{useState} from 'react'
// import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChartBar,faGears,faHexagonNodes,faChartSimple,faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';
import Header from "@/components/header";
import { Poppins  } from 'next/font/google';

const inter = Poppins ({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose weights
  variable: '--font-inter', // Optional CSS variable
});
export default function Home() {
  
  return (
    <div className={` ${inter.variable} flex flex-col items-start justify-start  min-h-screen     bg-white`}>
      <Header/>
      <main className="flex flex-col h-auto w-full items-center sm:items-start">
       
        <div className=' min-h-screen flex gap-y-6  flex-col w-full justify-start items-center'>
          <div className='w-full flex mt-32  h-auto'>
       <div className='w-3/5  flex flex-col gap-y-4 justify-end items-start'>
      <h1 className='text-[46px] font-semibold w-full text-end mb-6 leading-snug text-black/60 '>
      <pre>A helpdesk ticketing solution that</pre><p>helps you resolve customer queries faster</p>
      </h1>
        
         <button className='bg-gradient-to-r from-sky-800 to-sky-400/75 font-semibold ml-8 self-start px-16 py-3 rounded-full' type="button">Continue</button>   
        </div>     
         <div className='w-2/5  items-start top-16 flex justify-center   relative '>

      <Image
        src="/helpDesk.png"
        alt="Background"
        width={340}
        height={300}
        priority
        className='rounded-sm rounded-l-2xl rounded-bl-[100px]  relative'
      />
       {/* ring-2 ring-cyan-600 ring-offset-4 ring-offset-slate-700  */}
         </div>

          </div>

         <div className=' w-full bg-blue-200/45 flex justify-center h-auto mt-24'>

         <div className='flex w-3/4   items-center  flex-wrap mt-20 justify-evenly mb-6 gap-6 '>
           <div className='relative rounded-xl hover:border-blue-600 hover:bg-white bg-slate-100 border-2 border-blue-500/45  flex flex-col items-center justify-center  w-72 h-52'>
            <div>
           <FontAwesomeIcon className='text-xl w-16 h-16 text-blue-400/75' icon={faGears} />
              
            </div>
          <div className='p-2'>
          <p className='text-center text-black'>Improve productivity by automating repetitive and mundane tasks, so you can focus on resolving customer issues.</p>

          </div>

          </div>
           

          <div  className=' flex flex-col bg-slate-100 hover:border-blue-600 hover:bg-white border-2 border-blue-500/45  rounded-xl  items-center justify-center w-72 h-52'>
           <div className='w-fit'>
           <FontAwesomeIcon className='text-xl w-16 h-16  text-blue-400/75' icon={faChartBar} />
           </div>

           <div className='p-2 '>
            <p className='text-center text-black'>Move away from your inbox. Sort, prioritize and resolve customer issues with ease, by converting all the emails into tickets.</p>
           </div>

          </div>


          <div  className=' flex flex-col hover:border-blue-600 bg-slate-100 hover:bg-white p-2 border-2 border-blue-500/45  rounded-xl  items-center justify-center w-72 h-52 '>
           <div>
           <FontAwesomeIcon className='text-xl w-16 h-16 text-blue-400/75' icon={faHexagonNodes} />
           </div>

             <div>
              <p className='text-center text-black'>Provide contextual support across email, phone, chat, and social media channels from a unified view.</p>
             </div>
          </div>



          <div className=' flex flex-col hover:border-blue-600 bg-slate-100 hover:bg-white p-2 border-2 border-blue-500/45  rounded-xl  items-center justify-center w-72 h-52 '>
           <div >
           <FontAwesomeIcon className='text-xl w-16 h-16 text-blue-400/75' icon={faChartSimple} />
           </div>
           <div>
              <p className='text-center text-black'> Automating ticket prioritization, routing, and categorization, ensuring that urgent issues are handled efficiently.</p>
             </div>
          
          </div>


 
          <div className='  flex flex-col hover:border-blue-600 items-center p-2 hover:bg-white bg-slate-100 border-2 border-blue-500/45  rounded-xl justify-center w-72 h-52'>
           <div className=''>
           <FontAwesomeIcon className='text-xl w-16 h-16 text-blue-400/75' icon={faPuzzlePiece} />
           </div>
            <div className='p-2 '>
              <p className='text-center text-black'>Track team performance, measure customer satisfaction, and identify bottlenecks using customizable dashboards and reports.</p>
            </div>
          </div>


</div>




         </div>
         
          
          
        </div>
      
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"> */}
     
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a> */}
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      {/* </footer> */}
    </div>
  );
}