import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword,getAuth,onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";
import { z } from "zod";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  where,
  getDocs,
  query,
  limit
} from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import admin from "../../../lib/firebaseSecretKey";

const schema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    

    const auth = getAuth();
    
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("User is signed in:", user);
    //   } else {
    //     console.log("No user signed in.");
    //   }
    // });
    





    console.log(body.uid)
    //const token = await body.getIdToken(true);
    //await admin?.auth()?.setCustomUserClaims(body?.uid as string, { user: true });

if (auth.currentUser) {
  console.log("User is authenticated:", auth.currentUser.uid);
} else {
  console.log("User is NOT authenticated");
}
    if (body?.uid){

    
      await admin.auth().setCustomUserClaims(body.uid, { user: true });
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", body.email), limit(1));

      console.log("Executing query...");
      const querySnapshot = await getDocs(q);

      console.log("Documents found:", querySnapshot.size);

      if (!querySnapshot.empty){

        return NextResponse.json(
          { message: "Sign-in Successful", data: body?.uid },
          { status: 200 }
        );
      }

      else {
        console.log(body?.uid)
        console.log("hellow")
        const userRef = doc(db, "users", body.uid);
        console.log("Checking if user exists in Firestore...");
  
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            email: body.email,
            username: body.displayName,
            userImg: body.photoURL,
            createdAt: new Date(),
          });
  
        console.log("user is added")
          return NextResponse.json(
            { message: "User added successfully", data: body?.uid },
            { status: 200 }
          );
        }
      }
      
    }
    
    



    // const { email, password } = body;
    // const result = schema.safeParse({ email, password });

    // if (!result.success) {
    //   return NextResponse.json({ error: result.error.format() }, { status: 400 });
    // }

    // try {
    //   console.log("Signing in user...");
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);

    //   if (userCredential.user?.uid) {
     
    //     return NextResponse.json(
    //       { message: "Sign-in Successful", data: userCredential.user?.uid },
    //       { status: 200 }
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return NextResponse.json(
    //     { message: "Invalid Credentials, wrong email or password" },
    //     { status: 401 }
    //   );
    // }
  } catch (error: any) {
    console.error("Server error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
