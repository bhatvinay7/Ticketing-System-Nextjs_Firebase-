"use client"; // Required for client-side interactions

import { useState,useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios'
import Header from "@/components/Header";
import useAxiosPrivate from "@/lib/useAxiosPrivate";

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Ensure this path is correct or create the module if it doesn't exist


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'


export default function TicketForm() {
  const axiosPrivate=useAxiosPrivate()
  const [isSubmit,setSubmit]=useState(false)
  const [date, setDate] = React.useState<string>("")
  const [errorMap, setErrorMap] = useState<errorData[]>([]);
  const [response,setResponse]=useState<successResponse>()
  const [isLoading,setIsLoading]=useState<boolean>(false)

 
  const [formData, setFormData] = useState<formDetails>({
    title: "",
    description: "",
    priority: "",
    category: "",
    name: "",
    mobile: "",
    date:""
   // files: [],
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file drop
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: {
  //     'image/*': [],
  //     'application/pdf': [],
  //     'application/msword': [],
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
  //   },
  //   onDrop: (acceptedFiles) => {
  //     setFormData({ ...formData, files: acceptedFiles });
  //   },
  // });


  function  handleChangeForShad(obj:{target:{name:string,value:string}}){
    setFormData({ ...formData, [obj.target.name]: obj.target.value });                
    
  }
  // Handle form submission

 
    const  handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
      const updateFormData={...formData,date:date}
      setFormData(updateFormData)
      console.log(JSON.stringify(updateFormData))
      try{
        setIsLoading(true)
        const response = await axiosPrivate.post('/api/ticket',JSON.stringify(formData),{
        });
  
  
        setResponse(response.data)
        setIsLoading(false) 
        setTimeout(()=>{
          setResponse(undefined)
        },6000)
       
      }
      catch(error:any){
        setIsLoading(false)   
        if(!error.response?.data?.error?.message){
        const formattedErrors  = Object.entries(error.response?.data?.error as ZodErrorResponse)
    .filter(([key,value]) => key !== "_errors" &&  (value?._errors?.length ?? 0) > 0) // Exclude _errors
    .map(([key, value])=> ({ field: key, message: value._errors[0] }));
  
  
        setErrorMap(formattedErrors)
        setTimeout(()=>{
          setErrorMap([])
        },6000)
      }
    }
      
    }


  return (
    <>
    
    
    <div className=" relative w-full min-w-[260px] flex justify-center mx-auto bg-slate-100  p-2 min-h-screen">

         {response ? <div className="absolute w-full h-20 z-[38] inset-0 top-0 font-bold flex  flex-justify-center items-center bg-green-200 backdrop-blur-md"><span className="text-green-600 text-xl p-2 font-semibold">{response.message}</span></div>:<></>}
       
         
         <div className=" flex absolute bg-gradient-to-br w-full z-[38] px-1 top-0 from-slate-200 shadow shadow-black/20 to-gray-100  justify-center  h-auto flex-col ">
      
      {errorMap.length > 0 && errorMap.map((error:errorData, index) => {
        console.log(errorMap)
        
        return(
          <div key={index} className=" text-red-500 p-2 rounded-md">
          <p>{`* ${error.message}`}</p>
          </div>
      )})}
      
      </div>   
    <div className="  w-full lg:w-3/4 mx-auto p-2 bg-white/45 rounded-xl  border-r-8 border-blue-500/10 backdrop-blur-md   ">
   
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a Support Ticket</h2>
     
       
      <form onSubmit={(e)=>{handleSubmit(e)}} className=" lg:hidden space-y-4">
        
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 text-black  border border-black rounded-md focus:ring focus:ring-indigo-400"
        
            />
        </div>

        {/* Problem Description */}
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Problem Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 p-2 text-black min-h-52 max-h-72   border border-black rounded-md focus:ring focus:ring-indigo-400"
        
            />
        </div>

        {/* Priority Dropdown */}
        <div>
          <label htmlFor="priority"  className="block font-semibold text-gray-700">Priority</label>
          <Select   onValueChange={(value) => handleChangeForShad({ target: { name: "priority", value } })}>
  <SelectTrigger className=" w-full mt-1  border border-black rounded-md text-black focus:ring focus:ring-indigo-400">
    <SelectValue   placeholder={formData.priority || "Priority" } />
  </SelectTrigger>
  <SelectContent className="bg-gray-200 text-black !important hover:bg-gray-100">
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="Low">Low</SelectItem>
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="Medium">Medium</SelectItem>
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="High">High</SelectItem>
  </SelectContent>
</Select>


<label htmlFor="category" className="block font-semibold text-gray-700">
        Category
      </label>
      <Select  onValueChange={(value) => handleChangeForShad({ target: { name: "category", value } })}>
        <SelectTrigger className="w-full mt-1 p-2 bg-white border border-black rounded-md text-black focus:ring focus:ring-indigo-400">
          <SelectValue placeholder={formData.category || "Select a category"} />
        </SelectTrigger>
        <SelectContent className="bg-gray-200  text-black !important hover:bg-gray-100">
  
  <SelectItem className=""  value="Software">Software</SelectItem>
  <SelectItem className="" value="General Query">General Query – Info about services/products.</SelectItem>
  <SelectItem className="" value="Billing Inquiry">Billing – Invoice, payments, refunds.</SelectItem>
  <SelectItem className="" value="Account Access Issue">Account – Login, password reset.</SelectItem>
  <SelectItem className="" value="Feature Request">Feature Request – New feature suggestions.</SelectItem>

  
    <SelectItem className="" value="Login Issues">Login – Cannot log in, reset issues.</SelectItem>
    <SelectItem className="" value="Website/App Crash">Crash – App not loading.</SelectItem>
    <SelectItem className="" value="Slow Performance">Slow Performance – Laggy app.</SelectItem>
    <SelectItem className="" value="Error Messages">Errors – Unexpected failures.</SelectItem>
    <SelectItem className="" value="Integration Issues">Integration – Issues with APIs.</SelectItem>
  

  
    <SelectItem className=""value="Order Not Processed">Order – Payment deducted, not confirmed.</SelectItem>
    <SelectItem className=""value="Incorrect Item Received">Wrong Item – Incorrect delivery.</SelectItem>
    <SelectItem className=""value="Subscription Issues">Subscription – Auto-renew/cancel issues.</SelectItem>
    <SelectItem className=""value="Refund Request">Refund – Failed transaction refund.</SelectItem>
    <SelectItem className=""value="Service Not Working">Service Issue – Features not working.</SelectItem>
  
 
    <SelectItem value="Unauthorized Access">Unauthorized Access – Hacked account.</SelectItem>
    <SelectItem value="Data Privacy Concern">Data Privacy – GDPR/CCPA requests.</SelectItem>
    <SelectItem value="Fraudulent Activity">Fraud – Unauthorized charges.</SelectItem>
 


    <SelectItem value="UI/UX Issues">UI/UX – Buttons, forms not working.</SelectItem>
    <SelectItem value="Accessibility Issues">Accessibility – Screen reader issues.</SelectItem>
    <SelectItem value="Feedback & Suggestions">Feedback – User suggestions.</SelectItem>
 

 
    <SelectItem value="Live Chat Not Available">Chat – Support chat unavailable.</SelectItem>
    <SelectItem value="Call Not Going Through">Call – Phone support issues.</SelectItem>
    <SelectItem value="Delayed Response">Response Delay – No reply yet.</SelectItem>
 
 
    <SelectItem value="Custom API Issue">API Issue – Authentication/fetch problems.</SelectItem>
    <SelectItem value="Subscription Upgrade Issue">Subscription – Upgrade/downgrade issues.</SelectItem>
    <SelectItem value="Dashboard Analytics Not Updating">Analytics – Data not updating.</SelectItem>
    <SelectItem value="User Role Management Issue">Roles – Assign/revoke problems.</SelectItem>
  

  <SelectItem value="Other">Other</SelectItem>




          
        </SelectContent>
      </Select>
 
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 text-black  border border-black rounded-md focus:ring focus:ring-indigo-400"
            />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="block font-semibold text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full mt-1 p-2 text-black border border-black rounded-md focus:ring focus:ring-indigo-400"
        
            />
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block font-semibold text-gray-700">Date</label>
        <Popover >
      <PopoverTrigger   asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full bg-white data-[highlighted]:bg-gray-400 data-[highlighted]:text-black border border-black text-black justify-start  text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent  className="w-auto bg-gray-600  text-white p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onDayClick={(value) =>{setDate(value.toDateString())
          console.log(value)
          }}
          
          className="bg-gray-600 text-white"
          />
      </PopoverContent>
    </Popover>




        </div> 

        {/* Drag and Drop File Upload */}
        {/* <div>
          <label className="block font-medium text-gray-700">Upload File</label>
          <div
          {...getRootProps()}
          className="w-full p-4 mt-1 border-2 border-dashed   border-black rounded-md cursor-pointer text-center hover:border-blue-400"
          >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag & drop files here, or click to select</p>
          </div>
          
          {/* Display selected files */}
          {/* {formData.files.length > 0 && (
            <ul className="mt-2 text-gray-700">
            {formData.files.map((file: File, index) => (
              <li key={index} className="text-sm">{file.name}</li>
              ))}
              </ul>
              )}
              </div> */} 

        {/* Submit Button */}
        {response ?
        <div className="w-full m-2 flex justify-center max-h-screen overflow-y-scroll bg-green-300/45 rounded-md h-12 items-center text-green-600 p-2 "> <span>Ticket successfully generated</span></div>
        :<></>}
        <button
          type="submit"
          className="w-full bg-black text-white flex justify-center items-center gap-x-4 py-2 rounded-md hover:bg-black/80 transition"
          >
          <FontAwesomeIcon className={` ${isLoading ? "text-xl text-white animate-spin block ":"hidden"} `} icon={faCircleNotch} />        <span>Submit Ticket</span>
        </button>
      </form>


 

      <form onSubmit={(e)=>{handleSubmit(e)}} className=" hidden caret-transparent lg:block w-full ">
        <div className=" h-auto flex w-full mx-auto justify-center items-center gap-2">
        <div className=" flex flex-col w-1/2 justify-center items-center  h-auto ">
        <div className="w-3/4">
          <label htmlFor="title" className="block font-medium mb-2 text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 text-black mb-2  border border-black rounded-md focus:ring focus:ring-indigo-400"

            />
        </div>
        
        <div className="w-3/4">
          <label htmlFor="priority"  className="block mb-2 font-semibold text-gray-700">Priority</label>
          <Select onValueChange={(value) => handleChangeForShad({ target: { name: "priority", value } })}>
  <SelectTrigger className="w-full mt-1 mb-2 p-2  border border-black rounded-md text-black focus:ring focus:ring-indigo-400">
    <SelectValue placeholder={formData.priority || "Priority" } />
  </SelectTrigger>
  <SelectContent className="bg-gray-200 text-black !important hover:bg-gray-100">
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="Low">Low</SelectItem>
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="Medium">Medium</SelectItem>
    <SelectItem className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black " value="High">High</SelectItem>
  </SelectContent>
</Select>


        </div>

        <div className=" w-3/4 ">
<label htmlFor="category" className="block font-semibold mb-2 text-gray-700">
        Category
      </label>
      <Select  onValueChange={(value) => handleChangeForShad({ target: { name: "category", value } })}>
        <SelectTrigger className=" w-full hover:bg-gray-300 mb-2  mt-1 p-2 bg-white border border-black rounded-md text-black focus:ring focus:ring-blue-300">
          <SelectValue className="" placeholder={formData.category || "Select a category"} />
        </SelectTrigger>
        <SelectContent className="bg-gray-200  absolute top-0 max-h-60 p-1 text-black !important hover:bg-gray-100">
  
  <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"  value="Software">Software</SelectItem>
  <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="General Query">General Query – Info about services/products.</SelectItem>
  <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Billing Inquiry">Billing – Invoice, payments, refunds.</SelectItem>
  <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Account Access Issue">Account – Login, password reset.</SelectItem>
  <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Feature Request">Feature Request – New feature suggestions.</SelectItem>

  
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Login Issues">Login – Cannot log in, reset issues.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Website/App Crash">Crash – App not loading.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Slow Performance">Slow Performance – Laggy app.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Error Messages">Errors – Unexpected failures.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100" value="Integration Issues">Integration – Issues with APIs.</SelectItem>
  

  
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"value="Order Not Processed">Order – Payment deducted, not confirmed.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"value="Incorrect Item Received">Wrong Item – Incorrect delivery.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"value="Subscription Issues">Subscription – Auto-renew/cancel issues.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"value="Refund Request">Refund – Failed transaction refund.</SelectItem>
    <SelectItem className="bg-gray-200 text-black hover:bg-gray-100"value="Service Not Working">Service Issue – Features not working.</SelectItem>
  
 
    <SelectItem value="Unauthorized Access">Unauthorized Access – Hacked account.</SelectItem>
    <SelectItem value="Data Privacy Concern">Data Privacy – GDPR/CCPA requests.</SelectItem>
    <SelectItem value="Fraudulent Activity">Fraud – Unauthorized charges.</SelectItem>
 


    <SelectItem value="UI/UX Issues">UI/UX – Buttons, forms not working.</SelectItem>
    <SelectItem value="Accessibility Issues">Accessibility – Screen reader issues.</SelectItem>
    <SelectItem value="Feedback & Suggestions">Feedback – User suggestions.</SelectItem>
 

 
    <SelectItem value="Live Chat Not Available">Chat – Support chat unavailable.</SelectItem>
    <SelectItem value="Call Not Going Through">Call – Phone support issues.</SelectItem>
    <SelectItem value="Delayed Response">Response Delay – No reply yet.</SelectItem>
 
 
    <SelectItem value="Custom API Issue">API Issue – Authentication/fetch problems.</SelectItem>
    <SelectItem value="Subscription Upgrade Issue">Subscription – Upgrade/downgrade issues.</SelectItem>
    <SelectItem value="Dashboard Analytics Not Updating">Analytics – Data not updating.</SelectItem>
    <SelectItem value="User Role Management Issue">Roles – Assign/revoke problems.</SelectItem>
  

  <SelectItem value="Other">Other</SelectItem>




          
        </SelectContent>
      </Select>
      </div>


        </div>

        <div className=" w-1/2 flex flex-col justify-center items-center  h-auto">
        <div className="w-3/4">
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 mb-2 p-2 text-black  border border-black rounded-md focus:ring focus:ring-indigo-400"
        
            />
        </div>

        {/* Mobile Number */}
        <div className="w-3/4">
          <label htmlFor="mobile" className="block font-semibold mb-2 text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full mt-1 mb-2 p-2 text-black border border-black rounded-md focus:ring focus:ring-indigo-400"
        
            />
        </div>

        {/* Date Picker */}
        <div className="w-3/4">
          <label htmlFor="date" className="block font-semibold text-gray-700">Date</label>
        <Popover >
      <PopoverTrigger   asChild>
        <Button
          variant={"outline"}
          className={cn(
            " w-full bg-white hover:bg-slate-400 mt-1 p-2 data-[highlighted]:bg-gray-400 data-[highlighted]:text-black  text-black justify-start  text-left font-normal ",
            !date && "text-muted-foreground"
          )}
          >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent  className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onDayClick={(value)=>{setDate(value.toDateString())}}
          className="bg-gray-700"
        />
      </PopoverContent>
    </Popover>




        </div> 

        </div>
        </div>

        {/* Drag and Drop File Upload */}
        {/* <div>
          <label className="block font-medium text-gray-700">Upload File</label>
          <div
          {...getRootProps()}
          className="w-full p-4 mt-1 border-2 border-dashed   border-black rounded-md cursor-pointer text-center hover:border-blue-400"
          >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag & drop files here, or click to select</p>
          </div>
          
          {/* Display selected files */}
          {/* {formData.files.length > 0 && (
            <ul className="mt-2 text-gray-700">
            {formData.files.map((file: File, index) => (
              <li key={index} className="text-sm">{file.name}</li>
              ))}
              </ul>
              )}
              </div> */} 

        {/* Submit Button */}
       

        
        <div className=" flex flex-col  justify-center items-center mb-4 p-4">
          <label htmlFor="description" className="block self-start font-medium text-gray-700">Problem Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="  w-full mt-1 p-3 text-black min-h-32 max-h-56 border border-black rounded-md focus:ring focus:ring-indigo-400"
    
            />
      
        </div>
        
        <div className=" w-full mx-auto flex justify-center items-center">
        <button
          type="submit"
          className={` w-2/5 bg-purple-700 border-2 border-slate-400 flex justify-center items-center gap-x-4 text-white py-3 rounded-md hover:bg-indigo-500 transition`} >
                <FontAwesomeIcon className={` ${isLoading ? "text-xl text-white animate-spin block ":"hidden"} `} icon={faCircleNotch} />        <span>Submit Ticket</span>
        </button>

        </div>
      </form>
















    </div>
    </div>
            </>
  );
}
