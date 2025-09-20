"use client"
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Paymentpage from './Paymentpage'
import CheckoutPage from './Checkout'

const Profile = ({ Username }) => {
  // let user= params
  const { data: session } = useSession()
  const [edit, setedit] = useState(false)



  function blockInvalidChar(e) {
    if (['e', 'E'].includes(e.key)) {
      e.preventDefault(); // Prevents the 'e' or 'E' from being entered
    }
  }

  if (!session) {
    redirect('/login')
  }
  else {
    console.log(session)

    return (
      <div className='flex justify-center gap-2  flex-wrap h-screen overflow-x-scroll no-scrollbar '>





          <aside className="aside rounded-lg w-full lg:w-1/4 bg-white p-5 flex flex-col
        items-center  md:items-start">

            <div>

              {session.user.image ? <img className='h-25 md:h-50 md:w-50' src={`${session.user.image}`} alt="" /> : <div className='h-50 w-50 pb-2 bg-slate-600 flex items-center justify-center rounded-full text-9xl'>{session.user.name.split("")[0].toUpperCase()}</div>}
              {edit && <div className=' bg-slate-600 w-5 h-5  md:w-7 md:h-7 rounded-lg flex items-center justify-center relative bottom-5 left-18 md:bottom-10 md:left-40 m-0'>

                <input type="file" name="" id="dropzone-file" className="hidden " />
                <label htmlFor="dropzone-file" className='h-4 w-4 md:h-auto md:w-auto'>
                  <img className=' ' src="pencil.svg" alt="" />

                </label>
              </div>}
            </div>
            <h3 className='text-xl font-bold'>{session.user.name}</h3><h3>@username</h3>
            <p className='text-center md:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vel blanditiis deserunt magni? Esse, laboriosam corporis. Officiis quia ratione nisi.</p>
            <button className='bg-white border p-2 m-2 rounded-lg w-full sm:w-1/2 md:w-full' onClick={() => { setedit(!edit) }}>{!edit ? "Edit Profile" : "Save"}</button>
          </aside>




          <main className='main rounded-lg w-full h-fit lg:w-2/3 bg-purple-300 flex p-5 gap-5 flex-wrap justify-evenly'>

            <div className="supporters  lg:w-1/2 w-full   ">
              <h1 className='text-xl font-bold mb-2 '>Supporters</h1>
              {/* list all supporters as leaderboard */}
              <ul className='min-h-[30vh] max-h-[50vh] lg:max-h-[60vh] overflow-y-scroll no-scrollbar '>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>
                <li className='flex items-start my-4 gap-2'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    stroke="light"
                    state="hover-looking-around"
                    style={{ "width": 33 }}>
                  </lord-icon>
                  <span className='mt-1'>Subhanm donated <span className='font-bold'>₹30</span>  with message  "I support you bro. Lots of ❤️"</span>
                </li>


              </ul>
            </div>
            <Paymentpage />
          </main>
      </div>
    )
  }
}

export default Profile
