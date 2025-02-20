import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,getAuth } from "firebase/auth";
import { db,auth} from "../../../lib/firebaseConfig";
import { collection, getDocs, addDoc, doc,setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {

  try{
    const {username,email,password}= await req.json()
    

    const schema= z.object({
      username:z.string().min(3,"please enter your username"),
      email: z.string().email("please provide a valid email"),
      password:z.string().min(6,"password must be atleast 6 characters long")

    })
   
    const result = schema.safeParse({ username, email, password });
    if (!result.success) {
      console.log("success")
      return NextResponse.json({error:result.error.format()},{status:400})
    }
    else{

    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;  
    if(user){
      await setDoc(doc(db, "users", user.uid),{
          uid: user.uid,
          username: username,
          email: email,
          password: password,
          userImg:user.photoURL,
          createdAt: new Date()
        });

    }
      const response = NextResponse.json({ message: "Signup successful", data:user.uid }, { status: 201 });
     
      return response;    
    }
  }
  catch(errr:any){
    if(errr?.code==="auth/email-already-in-use"){
    return NextResponse.json({message:"User already exists"},{status:409});
    }
    else{
      return NextResponse.json({message:"Server error"},{status:500})
    }
  }
    // Store additional details in Firestore
    // 

    // const body = await req.json()
    //   x
      // const { email, password } = req.body;
      // const userCollection = collection(db, "users");
      // const userInstance = await getDocs(userCollection);
      // const newuser = userInstance.docs.find((doc) => doc.data().email === email);
      // if (newuser) {
      //   res.status(400).json({ message: "User already exists" });
      // } else {
      //   await addDoc(userCollection, { email, password });
     // console.log(body)
  }
  
  // Handle GET request (Fetch user data)
  export async function GET() {
    return NextResponse.json({ message: "user data..." }, { status: 200 });
  }



                                                               