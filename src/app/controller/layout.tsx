"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseConfig";
import { useSelector } from "react-redux";
import { userStatus } from "../../redux/authSlice/auth";

import Header from "@/components/Header";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useSelector(userStatus);
  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error: any) {}
  }
  return (
    <div className={` bg-blue-50/25  overflow-y-auto  `}>
      <div className=" w-full min-h-screen relative h-auto flex caret-transparent ">
        <div className=" w-[180px]  sticky hidden   lg:flex inset-0  h-auto">
          <div className="w-full bg-blue-50/25 shadow shadow-black/45  cursor-pointer caret-transparent inset-0 border-r border-black/10 flex flex-col items-center  min-h-screen h-full">
            <div className=" w-32 text-violet-500/75 self-start text-2xl  p-2 ml-3 font-bold h-12">
              TixBee
            </div>
            <div className=" mt-4 flex flex-col w-full "></div>
            <div className=" flex w-full justify-start cursor-pointer caret-transparent hover:bg-slate-200/25 border-b border-gray-400/25   p-2 gap-x-4 items-center ">
              <div className=" bg-dashboard w-6 h-6 cursor-pointer bg-center bg-cover "></div>
              <div className="w-fit  h-10 text-center text-indigo-950/80 rounded-md">
                Dashboard
              </div>
            </div>
            <div onClick={() => {
                  router.push("/user/raiseticket");
                }} className=" flex w-full justify-start hover:bg-slate-200/25 border-b caret-transparent  border-gray-400/20  p-2 gap-x-4 items-center">
              <div
                
                className=" cursor-pointer bg-ticket w-6 h-6  bg-center bg-cover"
              ></div>
              <div className="w-fit  h-10 text-center  text-indigo-950/80 rounded-md">
                Raise Ticket
              </div>
            </div>

            <div className=" flex w-full justify-start cursor-pointer hover:bg-slate-200/25 border-b border-gray-400/20  p-2 gap-x-4 items-center">
              <div className="bg-inbox w-6 h-6 bg-center bg-cover"></div>
              <div className="w-fit  h-10 text-center  text-indigo-950/80 rounded-md">
                View Ticket
              </div>
            </div>

            <div className=" flex w-full justify-start cursor-pointer caret-transparent hover:bg-slate-200/25 group p-2 gap-x-4 items-center">
              <div className="bg-logout w-6 h-6 bg-center bg-cover"></div>
              <div
                onClick={() => {
                  router.push("/login"), handleSignOut;
                }}
                className="w-fit  h-10 text-center  group-hover:text-red-700 hover:font-semibold  text-indigo-950/80 rounded-md"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  flex-col min-h-screen hidden md:flex bg-white h-full">
          <div className="w-full relative h-16 p-2 flex justify-between items-center bg-slate-100 border-b border-black/10">
            {/* <div className='absolute h-12 rounded-sm bg-black/80 text-red-500 transition-all font-semibold delay-700 ease-in top-8 right-6 '></div>
                        :<></>} */}
            <div className=" flex gap-x-2 items-center">
            <div className=" w-32 lg:hidden block text-violet-500/75 self-start text-2xl  p-2 ml-3 font-bold h-12">
              TixBee
            </div>

              <button
                type="button"
                onClick={() => {
                  router.push("/");
                }}
                className=" py-[0.25px] h-7 px-1 border border-black/10 text-sm rounded-sm text-black hover:bg-slate-200/80 "
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => {
                  router.push("/user/dashboard");
                }}
                className=" py-[0.25px] h-7 px-1 lg:hidden block border border-black/10 text-sm rounded-sm text-black hover:bg-slate-200/80 "
              >
                Dashboard
              </button>




            </div>
           
            <div className="flex items-center gap-x-4">

            <button
                type="button"
                onClick={() => {
                  router.push("/");
                }}
                className=" py-[0.25px] h-7 px-1 lg:hidden block border border-black/10 text-sm rounded-sm text-red-600 hover:bg-slate-200/80 "
              >
                Log out
              </button>

            <div className="w-[32px] h-[32px] mr-8 relative bg-white rounded-full">
              {user?.photoURL ? (
                <Image
                  src={`${user.photoURL}`}
                  alt="userPhoto"
                  width={32}
                  height={32}
                  priority
                  className="rounded-full   inset-0 relative"
                />
              ) : (
                <></>
              )}
            </div>

            </div>
          </div>
          <div className=" w-full h-auto hidden md:flex md:flex-col">{children}</div>
        </div>
        <div className="h-auto w-full  flex flex-col md:hidden">
          <Header />
          <div className="w-full h-auto relative top-16">

          {children}
          </div>
        </div>
      </div>
    </div>
  );
}
