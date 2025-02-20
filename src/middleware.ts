import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from  './lib/firebaseSecretKey'
import {auth} from './lib/firebaseConfig'// Ensure this path is correct and the file exists

export async  function middleware(request: NextRequest){
    //return NextResponse.redirect(new URL("/", req.url))
    
    



  // if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/login', request.url))
  //   }

    const res= NextResponse.next();
    // res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    // res.headers.set('Pragma', 'no-cache');
    // res.headers.set('Expires', '0');

    //Add cors headers
    // res.headers.set("Access-Control-Allow-Origin", "*"); // Change '*' to specific domains if needed
  // res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // if (req.method === "OPTIONS") {
  //   return new Response(null, { status: 204 });
  // }
  
  // return res;
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export const config = {
    //   matcher: "/app/:path*",
    // };

// export function middleware(req: NextRequest) {
//   console.log("Middleware is running for:", req.nextUrl.pathname);

//   // Check if the request matches the expected path
//   if (req.nextUrl.pathname.startsWith("/app/")) {
//     console.log("Redirecting to home page");
//     const url = new URL("/", req.url);
//     return NextResponse.redirect(url);
//   }

//   // If the path does not match, continue with the request
//   return NextResponse.next();
// }
export const config = {
  matcher: '/:path*',
};