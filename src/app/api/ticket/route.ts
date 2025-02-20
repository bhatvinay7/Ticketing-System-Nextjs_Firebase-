import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../lib/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc, doc,serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
    const data = await req.json();
   
  const schema = z.object({
    title: z.string().min(5,"Title must be at least 5 characters long"),
    description: z.string().min(10,"Description must be at least 15 characters long"),
    priority: z.string().min(1," pleease choose the priority"),
    category: z.string().min(1,"please choose the category"),
    name: z.string().min(3,"please enter your name"),
    mobile: z.string().min(10,"please enter a valid mobile number"),
    date: z.string().min(1,"please enter a valid date"),
    //files: z.array(z.string()).min(1,"please upload a file"),
  });
  const result = schema.safeParse(data);
  
if (!result.success) {
  return NextResponse.json({message:"Invalid data",error:result.error.format()},{status:400})
} 

else {
    const newdata={...result?.data,delete:false,status:"processing",assignTo:""}
    const newSchema = schema.extend({
        delete: z.boolean(),
        assignTo: z.string(),
      });
   const newResult=newSchema.safeParse(newdata)
   if(!newResult.success){
    console.log(newResult.error.format())
    return NextResponse.json({ message: "Invalid data", error: newResult.error.format() }, { status: 400 });
   }   
    else{

      
        try {
          const user=newResult.data
        const result=  await addDoc(collection(db, "users"), {
             ...user,
            createdAt: serverTimestamp(), // Firestore-generated timestamp
          });
         
          console.log(result)
          return NextResponse.json({message:"Ticket created successfully"},{status:201})
        } catch (error) {
          return NextResponse.json({message:"Serverside error please try again"},{status:500})
        }
        
    }
}
    
  }
  
  // Handle GET request (Fetch user data)
  export async function GET() {
    return NextResponse.json({ message: "user data..." }, { status: 200 });
  }



                                                               