"use client"
// import React from 'react'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Profile from '@/component/Profile'
import Projects from '@/component/Projects'
import Image from 'next/image'
import CheckoutPage from '@/component/Checkout'



import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import PersonIcon from '@mui/icons-material/Person';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';

const Home = () => {
  const [value, setValue] = useState('recents');
  const { data: session } = useSession()
  const [aside, setaside] = useState(false)
  const [showdropdown, setshowdropdown] = useState(false)
  const [accountSetting, setaccountSetting] = useState(false)
  const [payments, setpayments] = useState(false)
  const [mystuff, setmystuff] = useState(false)
  const [pannel, setpannel] = useState("Home")

  const [sideOptions, setsideOptions] = useState({ Home: true, Search: false, Explore: false, Projects: false, Message: false, Notification: false, Create: false, Profile: false, More: false })



  if (!session) {
    redirect("/login")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(session.user.image)

  return (<>


    <div className='md:h-fit border min-h-screen flex flex-col  md:flex-row w-full bg-gray-300  '>

      <div className='sidebar   h-auto w-auto  hidden md:flex  flex-col md:flex-row items-start  bg-purple-700'>









        <aside id="sidebar-multi-level-sidebar" className={` ${aside ? "absolute  top-39  md:static" : "absolute -translate-x-full md:translate-x-0  md:static"}  z-4 w-full  md:w-fit lg:w-64 h-fit md:h-screen transition-transform `} aria-label="Sidebar">
          <div className="h-full px-3 py-4 text-black  bg-gray-300  ">

            <ul className="flex flex-col  space-y-2 font-medium">
              <div className="logo hidden lg:block  h-15 mb-3">
                <img className='h-15 z-5 ' src="GMAC.png" alt="" />
                <div className="bg-black opacity-30 relative rotate-x-[75deg] blur-md left-6 h-10 w-15 rounded-[200px] -top-4 z-4">

                </div>
              </div>
              <div className="logo  lg:hidden  h-15 mb-3">
                <h1 className='font-bold font-sans'>GMAC</h1>
              </div>





              <div className="flex items-center justify-center lg:justify-start lg:p-2 text-gray-900 rounded-lg  cursor-default">
                <img src={`${session.user.image}`} className='h-10 border border-black rounded-full p-[2px]' alt="" />
                <span className="ms-3 hidden font-bold lg:flex">{session.user.name}</span>
              </div>
              <div className='bg-gray-200 h-[1px]'>

              </div>

              <button onClick={() => { setsideOptions({ Home: true, Search: false, Explore: false, Projects: false, Message: false, Notification: false, Create: false, Profile: false, More: false }), setpannel("Home") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Home ? "bg-purple-600 text-white" : ""} group`}>
                  <HomeIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Home</span>
                </Link>
              </button>

              <button onClick={() => { setsideOptions({ Home: false, Search: true, Explore: false, Projects: false, Message: false, Notification: false, Create: false, Profile: false, More: false }), setpannel("Search") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Search ? "bg-purple-600 text-white" : ""} group`}>
                  <SearchRoundedIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Search</span>
                </Link>
              </button>

              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: true, Projects: false, Message: false, Notification: false, Create: false, Profile: false, More: false }), setpannel("Explore") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Explore ? "bg-purple-600 text-white" : ""} group`}>
                  <ExploreRoundedIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Explore</span>
                </Link>
              </button>

              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: true, Message: false, Notification: false, Create: false, Profile: false, More: false }), setpannel("Projects") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Projects ? "bg-purple-600 text-white" : ""} group`}>
                  <TipsAndUpdatesTwoToneIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Projects</span>
                </Link>
              </button>

              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: false, Message: true, Notification: false, Create: false, Profile: false, More: false }), setpannel("Message") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Message ? "bg-purple-600 text-white" : ""} group`}>
                  <ChatRoundedIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Message</span>
                </Link>
              </button>
              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: false, Message: false, Notification: true, Create: false, Profile: false, More: false }), setpannel("Notification") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Notification ? "bg-purple-600 text-white" : ""} group`}>
                  <FavoriteBorderRoundedIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Notification</span>
                </Link>
              </button>
              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: false, Message: false, Notification: false, Create: true, Profile: false, More: false }), setpannel("Create") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Create ? "bg-purple-600 text-white" : ""} group`}>
                  <AddToPhotosRoundedIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Create</span>
                </Link>
              </button>
              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: false, Message: false, Notification: false, Create: false, Profile: true, More: false }), setpannel("Profile") }}>
                <Link href="#" className={`flex items-center justify-center p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.Profile ? "bg-purple-600 text-white" : ""} group`}>
                  <PersonIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap text-left hidden lg:flex">Profile</span>
                </Link>
              </button>

              <button onClick={() => { setsideOptions({ Home: false, Search: false, Explore: false, Projects: false, Message: false, Notification: false, Create: false, Profile: false, More: true }), setpannel("More") }} >
                <Link href="#" className={`flex items-center justify-center lg:justify-start p-2 text-gray-900 rounded-lg  hover:bg-purple-600 hover:text-white ${sideOptions.More ? "bg-purple-600 text-white" : ""} group`}>
                  <ListRoundedIcon />
                  <span className="hidden lg:flex ms-3 whitespace-nowrap text-left">More</span>
                </Link>
              </button>







            </ul>
          </div>
        </aside>



      </div>

      <div className='w-full   bg-white'>
        {/* <h2 className='text-xl font-bold  w-full pt-1 pl-2 flex items-center text-white bg-purple-600'>{pannel.toUpperCase()}</h2> */}








        {pannel == "Home" && <div className=" flex h-screen ">

          <div className='left w-full lg:w-2/3 border-r border-gray-400  min-h-screen overflow-y-scroll no-scrollbar'>


            <div className='sticky h-10 bg-purple-600 top-0 w-full text-white flex items-center justify-center'>
              <p className='font-bold'>Following</p>
            </div>

            <div className="posts sm:px-5 h-fit">

              <div className="post  bg-gray-400 h-fit w-full sm:w-2/3 sm:mx-auto my-2 ">
                <div className='h-13 px-2 flex items-center justify-between bg-gray-300'>
                  <div className='flex  gap-2 items-center'>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="" />
                    <p>shxm</p>
                    <p>.2D</p>
                  </div>
                  <div>
                    Options
                  </div>

                </div>
                <img className='h-fit w-full' src={`${session.user.image}`} alt="" />
                <div className='h-fit px-1 flex items-center justify-between bg-gray-300'>
                  <div className='flex gap-2'>
                    <button type='button'>Like</button>
                    <button type='button'>Comment</button>
                    <button type='button'>Share</button>
                  </div>
                  <div>
                    <button type='button'>Save</button>
                  </div>
                </div>
                <div className='h-fit px-1 bg-gray-300'>
                  <p>shxm</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias repudiandae deserunt delectus cum et eveniet vel, ea eum maiores ullam quidem nisi temporibus aliquam in molestias quo sint veritatis.</p>
                  <p>Comments</p>
                </div>

              </div>

              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>

              <div className="post  bg-gray-400 h-fit w-full sm:w-2/3 sm:mx-auto my-2 ">
                <div className='h-13 px-2 flex items-center justify-between bg-gray-300'>
                  <div className='flex  gap-2 items-center'>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="" />
                    <p>shxm</p>
                    <p>.2D</p>
                  </div>
                  <div>
                    Options
                  </div>

                </div>
                <img className='h-fit w-full' src={`${session.user.image}`} alt="" />
                <div className='h-fit px-1 flex items-center justify-between bg-gray-300'>
                  <div className='flex gap-2'>
                    <button type='button'>Like</button>
                    <button type='button'>Comment</button>
                    <button type='button'>Share</button>
                  </div>
                  <div>
                    <button type='button'>Save</button>
                  </div>
                </div>
                <div className='h-fit px-1 bg-gray-300'>
                  <p>shxm</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias repudiandae deserunt delectus cum et eveniet vel, ea eum maiores ullam quidem nisi temporibus aliquam in molestias quo sint veritatis.</p>
                  <p>Comments</p>
                </div>

              </div>

              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>

              <div className="post  bg-gray-400 h-fit w-full sm:w-2/3 sm:mx-auto my-2 ">
                <div className='h-13 px-2 flex items-center justify-between bg-gray-300'>
                  <div className='flex  gap-2 items-center'>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="" />
                    <p>shxm</p>
                    <p>.2D</p>
                  </div>
                  <div>
                    Options
                  </div>

                </div>
                <img className='h-fit w-full' src={`${session.user.image}`} alt="" />
                <div className='h-fit px-1 flex items-center justify-between bg-gray-300'>
                  <div className='flex gap-2'>
                    <button type='button'>Like</button>
                    <button type='button'>Comment</button>
                    <button type='button'>Share</button>
                  </div>
                  <div>
                    <button type='button'>Save</button>
                  </div>
                </div>
                <div className='h-fit px-1 bg-gray-300'>
                  <p>shxm</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias repudiandae deserunt delectus cum et eveniet vel, ea eum maiores ullam quidem nisi temporibus aliquam in molestias quo sint veritatis.</p>
                  <p>Comments</p>
                </div>

              </div>

              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>

              <div className="post  bg-gray-400 h-fit w-full sm:w-2/3 sm:mx-auto my-2 ">
                <div className='h-13 px-2 flex items-center justify-between bg-gray-300'>
                  <div className='flex  gap-2 items-center'>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="" />
                    <p>shxm</p>
                    <p>.2D</p>
                  </div>
                  <div>
                    Options
                  </div>

                </div>
                <img className='h-fit w-full' src={`${session.user.image}`} alt="" />
                <div className='h-fit px-1 flex items-center justify-between bg-gray-300'>
                  <div className='flex gap-2'>
                    <button type='button'>Like</button>
                    <button type='button'>Comment</button>
                    <button type='button'>Share</button>
                  </div>
                  <div>
                    <button type='button'>Save</button>
                  </div>
                </div>
                <div className='h-fit px-1 bg-gray-300'>
                  <p>shxm</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias repudiandae deserunt delectus cum et eveniet vel, ea eum maiores ullam quidem nisi temporibus aliquam in molestias quo sint veritatis.</p>
                  <p>Comments</p>
                </div>

              </div>

              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>

              <div className="post  bg-gray-400 h-fit w-full sm:w-2/3 sm:mx-auto my-2 ">
                <div className='h-13 px-2 flex items-center justify-between bg-gray-300'>
                  <div className='flex  gap-2 items-center'>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="" />
                    <p>shxm</p>
                    <p>.2D</p>
                  </div>
                  <div>
                    Options
                  </div>

                </div>
                <img className='h-fit w-full' src={`${session.user.image}`} alt="" />
                <div className='h-fit px-1 flex items-center justify-between bg-gray-300'>
                  <div className='flex gap-2'>
                    <button type='button'>Like</button>
                    <button type='button'>Comment</button>
                    <button type='button'>Share</button>
                  </div>
                  <div>
                    <button type='button'>Save</button>
                  </div>
                </div>
                <div className='h-fit px-1 bg-gray-300'>
                  <p>shxm</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore alias repudiandae deserunt delectus cum et eveniet vel, ea eum maiores ullam quidem nisi temporibus aliquam in molestias quo sint veritatis.</p>
                  <p>Comments</p>
                </div>

              </div>

              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>


              <div className='saperator bg-gray-200 w-full sm:w-2/3 sm:mx-auto h-[1px]'></div>




            </div>

          </div>








          <div className='right w-1/3 hidden lg:block  min-h-screen'>


            <div className='px-5 mt-2 flex items-center justify-between '>
              <div className='flex items-center justify-start gap-2'>
                <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                <div>
                  <p className='font-bold'>shxm</p>
                  <p>Saksham Kushwaha</p>
                </div>
              </div>
              <button type='button'>Switch</button>
            </div>



            <div className='px-5 my-5 flex items-center justify-between'>
              <h4 className=' font-bold'>Suggested for you</h4>
              <button type='button'>See all</button>
            </div>




            <div className='px-3 mt-2'>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

              <div className=' mt-2 p-2 px-4 rounded-lg flex items-center hover:shadow-xl justify-between '>
                <div className='flex items-center justify-start gap-2'>
                  <img className='h-13 rounded-full' src={`${session.user.image}`} alt="" />
                  <div>
                    <p className='font-bold'>shxm</p>
                    <p>Saksham Kushwaha</p>
                  </div>
                </div>

                <button type='button'>Follow</button>
              </div>

 







            </div>
          </div>

        </div>}

        {pannel == "Search" && <div className="p-4 ">
          Search

        </div>}

        {pannel == "Explore" && <div className="p-4 ">
          Explore

        </div>}

        {pannel == "Profile" && <div className="p-4  ">
          <Profile />

        </div>}

        {pannel == "Projects" && <div className="p-4  ">
          <Projects />

        </div>}
        {pannel == "Message" && <div className="p-4  ">
          Message

        </div>}
        {pannel == "Notification" && <div className="p-4  ">
          Notification

        </div>}
        {pannel == "Create" && <div className="p-4  ">
          Create

        </div>}



        {/* Kanban  */}

        {pannel == "More" && <div className="p-4  ">
          More

        </div>}











        {pannel == "logout" && <div className="flex justify-center items-center h-[80vh] text-black ">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Do you really want to log out?</p>
            <div className="flex gap-4">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500  px-4 py-2 rounded"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setpannel("pannel")}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        }
      </div>

    </div>



    {/* Bottom Navigation  */}
    <div className='md:hidden absolute bottom-0 w-full bg-red-200'>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="chat"
          value="chat"
          icon={<ChatIcon />}
        />
        <BottomNavigationAction
          label="home"
          value="home"
          icon={<ChatIcon />}
        />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>

    </div>
  </>)
}

export default Home

