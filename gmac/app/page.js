"use client"
import ModelViewer from "@/component/Modleviewer";
import SquareRobot from "@/component/SquareRobot";
import { useState } from "react";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Home() {
  const [modelpath, setmodelpath] = useState("/Robot.glb")
  const { data: session } = useSession()
  if (session) {
    redirect("/home")
  }

  return (<>
    <main className="overflow-hidden">

      {/* rotate robot */}

      <div className="h-[150px] md:h-[250px] fixed -right-30 md:-right-25 -bottom-12 md:-bottom-22 z-10  ">
        <ModelViewer modelPath={modelpath} />
        <div className="bg-gray-400 relative rotate-x-[70deg] blur-sm left-34 md:left-33 h-5 w-7 md:h-10 md:w-10 rounded-[200px] -top-18 md:-top-30 z-5">

        </div>
      </div>



      {/* GMAC SPACE Social & Crowd Funding Platform */}

      <div className=" h-auto sm:flex mx-5 m-0">


        <div className="text p-4 w-full sm:w-1/2 ">
          <h1 className="sm:text-left text-4xl lg:text-7xl md:text-5xl font-bold text-center "><span className="text-6xl sm:text-4xl lg:text-7xl md:text-5xl bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700 text-transparent bg-clip-text">GMAC SPACE </span> <br />Social & Crowd Funding Platform</h1>
          <p className="text-center sm:text-left mt-5 md:text-xl md:mt-7 lg:mt-10 lg:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque eaque eveniet excepturi blanditiis expedita, corrupti eius temporibus vel consequuntur minus, facere praesentium voluptas neque, nostrum odit?</p>

          <div className="flex justify-center sm:justify-start w-full gap-5 mt-5 md:mt-7 lg:mt-10 ">
            <button type="button" className="text-white bg-gradient-to-b from-purple-400  to-purple-600  shadow-lg  hover:dark:shadow-lg hover:dark:shadow-purple-600/60 font-semibold rounded-full text-sm px-5 py-2.5 text-center transition-all duration-100 ">Get started</button>
            <button type="button" className="border border-gray-500  shadow-lg  hover:dark:shadow-lg hover:dark:shadow-gray-600/60 font-semibold rounded-full text-sm px-5 py-2.5 text-center transition-all duration-100 ">Watch a Demo</button>
          </div>
          <p className="text-center sm:text-left mt-5 md:text-xl md:mt-7 lg:mt-10 lg:text-2xl">Tested Software Reviewers</p>
          <div className="flex justify-center gap-2 sm:justify-start mt-2">
            <Stack spacing={5}>

              <Rating name="half-rating-read" value={4.5} precision={0.1} readOnly />
            </Stack>

            <p>4.5/
              <span className="text-gray-500">
                5.0
              </span>
            </p>
          </div>


        </div>


        <div className="model flex items-center justify-center h-[50vh] md:h-[65vh] lg:h-[85vh] pb-10 w-full sm:w-1/2 rounded-4xl bg-gradient-to-bl from-purple-400 via-purple-200  to-purple-500   ">
          <div className="w-2/3 h-2/3 flex items-center justify-center">


            <div className="relative  left-[50%] h-30 sm:left-[65%] sm:h-20 lg:left-[55%]  lg:h-40 z-5">

              <SquareRobot modelPath={"Robot.glb"} />
            </div>
            <img className="relative right-[50%] mt-10   lg:-left-[30%] lg:mt-20 " src="laptop.png" alt="" />
          </div>

        </div>

      </div>

      {/* Learn more about us */}

      <div className="flex flex-col gap-5  h-auto sm:flex w-9/10 mx-auto m-10">
        <h2 className="text-4xl font-bold text-center">Learn more about us</h2>
        <div className="flex flex-col sm:flex-row gap-5 justify-around mt-5">
          <div className=" flex justify-center items-center flex-col item space-y-2  text-center text-wrap sm:w-1/3">
            <lord-icon
              src="https://cdn.lordicon.com/xvmmqwjv.json"
              trigger="hover"
              stroke="light"
              style={{ height: 70, width: 70 }}>
            </lord-icon>
            <p className="font-bold">Large Community</p>
            <p className="font-bold">Discuss about upcoming projects with supporters</p>
          </div>
          <div className=" flex justify-center items-center flex-col item space-y-2 text-center text-wrap sm:w-1/3">
            <lord-icon
              src="https://cdn.lordicon.com/kkdnopsh.json"
              trigger="hover"
              style={{ height: 70, width: 70 }}>
            </lord-icon>
            <p className="font-bold">Fans want to help</p>
            <p className="font-bold">Your fans are available to help you</p>
          </div>
          <div className=" flex justify-center items-center flex-col item space-y-2 text-center text-wrap sm:w-1/3">
            <lord-icon
              src="https://cdn.lordicon.com/xjkryxnf.json"
              trigger="hover"
              stroke="light"
              style={{ height: 70, width: 70 }}>
            </lord-icon>
            <p className="font-bold">Create Network</p>
            <p className="font-bold">Collab with Qnuque Ideas</p>
          </div>

        </div>
      </div>



      {/* Share Engage fund Repeat  */}

      <div className="h-fit lg:h-[90vh] w-fit mx-auto  ">

        <div className=" w-[90vw] h-fit sm:h-[50vh] md:h-[60vh] lg:h-[80vh] bg-gradient-to-br  from-purple-400 via-purple-300  to-purple-500 sm:bg-none mb-5 rounded-4xl">


          <div className=" w-[90vw] h-fit sm:h-[50vh] md:h-[60vh] lg:h-[80vh]  mx-auto m-5 sm:bg-gradient-to-br sm:from-purple-400 sm:via-purple-300  sm:to-purple-500 sm:[clip-path:polygon(0%_0%,100%_0%,99%_90%,0%_100%)] sm:rounded-4xl pb-4 ">

            <h2 className="sm:text-left text-4xl lg:text-7xl md:text-5xl font-bold text-center text-white pt-10 mx-5">Share - Engage - Fund - Repeat</h2>


            <p className="text-center text-white w-full sm:w-1/2 md:w-2/3 sm:ml-5  sm:text-left mt-5 md:text-xl md:mt-7 lg:mt-10 lg:text-2xl ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate iste nostrum aperiam odit qui ab quas corrupti sint, ratione, sapiente consectetur suscipit quos, perspiciatis quis.</p>
          </div>
          <img className="h-50  sm:h-60 md:h-70 lg:h-80 relative   left-[30%] bottom-0 sm:bottom-65 sm:left-[68%]  md:left-[73%] md:bottom-75  lg:left-[80%] lg:bottom-85 z-5" src="developer.png" alt="" />
        </div>
      </div>

















    </main>
  </>);
}
