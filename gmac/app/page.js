"use client"
import ModelViewer from "@/component/Modleviewer";
import SquareRobot from "@/component/SquareRobot";
import { useState } from "react";

export default function Home() {
  const [modelpath, setmodelpath] = useState("/Eva.glb")

  return (<>
    <main className="">
      <div className=" h-auto sm:flex mx-5 m-0">


        <div className="text p-4 w-full sm:w-1/2 ">
          <h1 className="sm:text-left text-4xl lg:text-7xl md:text-5xl font-bold text-center "><span className="text-6xl sm:text-4xl lg:text-7xl md:text-5xl bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700 text-transparent bg-clip-text">GMAC SPACE </span> <br />Social & Crowd Funding Platform</h1>
          <p className="text-center sm:text-left mt-5 md:text-xl md:mt-7 lg:mt-10 lg:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque eaque eveniet excepturi blanditiis expedita, corrupti eius temporibus vel consequuntur minus, facere praesentium voluptas neque, nostrum odit?</p>

          <div className="flex justify-center sm:justify-start w-full gap-5 mt-5 md:mt-7 lg:mt-10 ">
            <button type="button" className="text-white bg-gradient-to-b from-purple-400  to-purple-600  shadow-lg  hover:dark:shadow-lg hover:dark:shadow-purple-600/60 font-semibold rounded-full text-sm px-5 py-2.5 text-center transition-all duration-100 ">Get started</button>
            <button type="button" className="border border-gray-500  shadow-lg  hover:dark:shadow-lg hover:dark:shadow-purple-600/60 font-semibold rounded-full text-sm px-5 py-2.5 text-center transition-all duration-100 ">Watch a Demo</button>
          </div>
          <p className="text-center sm:text-left mt-5 md:text-xl md:mt-7 lg:mt-10 lg:text-2xl">Tested Software Reviewers</p>
          <div className="flex justify-center sm:justify-start mt-2">
            <img className="h-5" src="star.png" alt="" />
            <img className="h-5" src="star.png" alt="" />
            <img className="h-5" src="star.png" alt="" />
            <img className="h-5" src="star.png" alt="" />
            <img className="h-5" src="star.png" alt="" />
            <p>4.5/
              <span className="text-gray-500">
                5.0
              </span>
            </p>
          </div>

        </div>

        <div className="model pb-10 w-full sm:w-1/2 rounded-4xl bg-gradient-to-bl from-purple-400 via-purple-200  to-purple-500   ">
          <div className="relative  top-10 h-100">

            <SquareRobot modelPath={"Robot.glb"} />
          </div>

        </div>

      </div>









      <div className=" h-[250px] fixed  -right-25 -bottom-22 z-10 ">
        <ModelViewer modelPath={modelpath} />
        <div className="bg-gray-400 relative rotate-x-[70deg] blur-sm left-33 h-10 w-10 rounded-[200px] -top-30 z-5">

        </div>
      </div>





    </main>
  </>);
}
