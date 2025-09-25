"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

import { ToastContainer, toast, Bounce } from 'react-toastify';
import Paymentpage from './Paymentpage'
import { CheckUserName } from '@/lib/checkUser'
import Link from 'next/link'
import ImageCropper from "@/component/ImageCropper";
import { set } from 'mongoose'
import User from '@/models/User'

import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';

const Profile = ({ Username }) => {
  console.log(Username)
  // let user= params
  const { data: session } = useSession()
  const [edit, setedit] = useState(false)
  const [USER, setUSER] = useState(Username)
  const [ValidUsername, setValidUsername] = useState(true)
  const [ProfileForm, setProfileForm] = useState({ name: USER.name, username: USER.username, bio: USER.bio })
  const [links, setlinks] = useState(USER.links)
  const [link, setlink] = useState("")
  const [linktext, setlinktext] = useState("")
  const [picture, setpicture] = useState(USER.profilepic)

  const [preview, setPreview] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);


  const handleChange = (e) => {
    setProfileForm({ ...ProfileForm, [e.target.name]: e.target.value })
  }

  const addLink = () => {
    if (linktext.length <= 0) {
      toast.info("Please give the title for the link")
      return

    }
    else if (link.length <= 0) {
      toast.info("Please add the link url")
      return

    }
    let found = false
    links.map((item) => {
      if (item.linktext === linktext) {
        toast.info("Link title already exists")
        found = true
        return
      }
    })
    if (found) {
      return
    }
    setlinks([...links, { link: link, linktext: linktext }])
    setlink("")
    setlinktext("")
  }

  const removeItem = (linktext) => {
    setlinks(links.filter(item => item.linktext !== linktext));
    let selected = links.filter(item => item.linktext === linktext)
    setlink(selected[0].link)
    setlinktext(selected[0].linktext)
  };




  const UpdateProfile = async () => {

    if (ProfileForm.name == null || ProfileForm.name == "") {
      toast.info("Please enter your name")
      return

    }
    else if (ProfileForm.username == null || ProfileForm.username == "") {
      toast.info("Please set a username")
      return

    }
    else if (ProfileForm.bio == null || ProfileForm.bio == "") {
      toast.info("Please enter your bio")
      return

    }
    else if (!picture) {
      toast.info("Please set the profile picture")
      return
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const raw = JSON.stringify({
      "links": links,
      "username": ProfileForm.username.toLowerCase(),
      "name": ProfileForm.name,
      "picture": picture,
      "bio": ProfileForm.bio
    });


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const r = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateprofile/${session.user.email}`, requestOptions)
    const result = await r.json()
    console.log("result", result.success)
    if (result.success) {
      toast.success("Updated Successfully")
      setpicture(USER.profilepic)
      // setlinks(USER.links)
      setProfileForm({ ...ProfileForm, bio: USER.bio })
    }
    else {

      toast.error(result.message)
      return


    }


  }



  useEffect(() => {

    const handleCheck = async () => {





      if (USER.username == ProfileForm.username) {
        setValidUsername(true)
        return true
      }
      else {

        const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/varify-username/${ProfileForm.username}`)
        const available = await user.json()
        setValidUsername(available)

        return user
      }
    }

    handleCheck()


  }, [ProfileForm])





  // useEffect(() => {

  //   const getuser = async () => {

  //     const UserData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchuser/${session.user.email}`)
  //     const User = await UserData.json()
  //     setUSER(User.getuser[0])
  //     setpicture(User.getuser[0].profilepic)
  //     setProfileForm({ name: User.getuser[0].name, username: User.getuser[0].username, bio: User.getuser[0].bio ? User.getuser[0].bio : "Tell about Yourself" })


  //     return User.getuser[0];

  //   }

  //   getuser()

  // }, [])






  const handleFileChange = (e) => {
    setImageUrl(null);
    setCroppedFile(null);
    setLoading(false);
    setPreview(null);
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setShowCropper(true); // Open cropper immediately
    }
  };

  const handleCropDone = async (croppedBlob) => {
    setLoading(true);

    // Convert blob -> File
    const croppedFile = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
    setImageUrl(URL.createObjectURL(croppedFile));
    setpicture(URL.createObjectURL(croppedFile));
    setShowCropper(false);
    const formData = new FormData();
    formData.append("file", croppedFile);

    // Upload to Cloudinary
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setpicture(data.url);
    setLoading(false);

    // simulate upload time
    // setTimeout(() => {

    //   setpicture(URL.createObjectURL(croppedFile));

    //   setLoading(false);
    // }, 3000);
  };













  if (!session) {
    redirect('/login')
  }
  else {

    return (<>
      <div className='md:hidden h-10 fixed top-0 w-full  flex justify-between px-5 items-center z-10 bg-white'>
        <div><SettingsOutlinedIcon/></div>
        <div className='font-semibold'>{USER.name}</div>
        <div><ListRoundedIcon/></div>
      </div>
      <div className="fixed top-10 w-full saperator h-[1px] bg-gray-300  md:hidden z-10"></div>
      <div className=' flex justify-center gap-2 flex-col lg:flex-row  p-4 my-5 md:my-0 md:pt-4  '>

        






        <aside className="aside rounded-lg h-fit  w-full lg:w-1/4 bg-white p-5 flex flex-col
        items-center  md:items-start  overflow-y-scroll no-scrollbar ">


          {/* {!USER.password && <div className='fixed md:hidden h-15 bg-purple-50 top-10 w-full text-black flex items-center justify-start px-5 border-b-[1px] border-gray-400 z-9 cursor-default mb-5'>
                     <span className='text-red-500'>*</span>Please set a password in Edit profile option.
                    </div>} */}

          <div>
            {loading && <div className={`h-25 w-25 md:h-50 md:w-50 bg-contain rounded-full`}
              style={{ backgroundImage: `url(${imageUrl})` }}>
              <div className='h-25 w-25 md:h-50 md:w-50 flex items-center justify-center bg-gray-500 rounded-full opacity-50'>
                <div className='h-15 w-15 md:h-30 md:w-30 border-b-3 border-r-3  border-white rounded-full animate-spin'>

                </div>

              </div>

            </div>}

            {!loading && <>  {session.user.image ? <img className='h-25 w-25 md:h-50 md:w-50 rounded-full' src={`${picture}`} alt="" /> : <div className='h-25 w-25 md:h-50 md:w-50  bg-slate-600 flex items-center justify-center rounded-full text-6xl md:text-9xl'>{session.user.name.split("")[0].toUpperCase()}</div>}
            </>}
            {edit && <div className=' bg-slate-600 w-5 h-5  md:w-7 md:h-7 rounded-lg flex items-center justify-center relative bottom-5 left-18 md:bottom-10 md:left-40 m-0'>

              <input type="file" name="fileInput" accept="image/*" onChange={handleFileChange} id="dropzone-file" className="hidden " />
              <label htmlFor="dropzone-file" className='h-4 w-4 md:h-auto md:w-auto'>
                <img className=' ' src="pencil.svg" alt="" />

              </label>




            </div>}
          </div>

          {showCropper && preview && (
            <ImageCropper
              image={preview}
              onCropDone={handleCropDone}
              onCancel={() => setShowCropper(false)}
            />
          )}




          {!edit && <>
            <h3 className='text-xl font-bold'>{USER.name}</h3><h3>@{USER.username}</h3>
            <p className='text-center md:text-left'>{USER.bio}</p>
            <div>
              {links && links.map((item, index) => {
                return (<div key={item.link} className='text-purple-700 font-semibold'><a className='flex items-center justify-start gap-1 text-[12px]' target='_blank' href={item.link}><LaunchTwoToneIcon fontSize='inherit' />{item.linktext}</a></div>)

              })}
            </div>
          </>}

          {edit && <>

            <div className='w-full mt-3'>

              <label className='relative left-2 bottom-0  ' htmlFor="name">Name</label>
              <input
                name="name"
                id='name'
                value={ProfileForm.name ?? ""}
                onChange={handleChange}
                placeholder={`${USER.name}`}
                className="w-full p-2 border rounded-lg "
              />
            </div>



            <div className='w-full mt-3'>
              <label className='relative left-2 bottom-0  ' htmlFor="username">Username</label>
              <div className='w-full p-2 border rounded-lg  flex justify-between'>



                <input
                  name="username"
                  value={ProfileForm.username}
                  onChange={handleChange}
                  placeholder={`${USER.username}`}
                  className="outline-none w-full"
                />
                <Image
                  src={ValidUsername ? "/rightTick.svg" : "/crossTick.svg"}
                  alt="toggle"
                  width={20}
                  height={20}
                  className=""
                />
              </div>
            </div>

            <div className='w-full mt-3'>

              <label className='relative left-2 bottom-0  ' htmlFor="bio">Bio</label>
              <input
                name="bio"
                id='bio'
                value={ProfileForm.bio ?? ""}
                onChange={handleChange}
                placeholder={USER.bio ? `${USER.bio}` :" Tell us about yourself"}
                className="w-full p-2 border rounded-lg "
              />
            </div>

            <p className='mt-3 w-full font-bold'>Add Social Links</p>

            {links.length < 4 && <>
              <div className='w-full mt-3'>

                <label htmlFor="linktext" className="relative">
                  <input
                    value={linktext}
                    onClick={() => { }}
                    onChange={(e) => { setlinktext(e.target.value) }}
                    type="text"
                    id="linktext"
                    placeholder=""
                    className="peer p-2 text-lg  mt-2 w-full rounded-lg  border  dark:border-gray-600 dark:bg-white "
                  />

                  <span className="absolute rounded px-1 inset-y-2 start-1 -translate-y-9 bg-white  font-medium  transition-transform h-6 peer-placeholder-shown:-translate-y-3 peer-focus:-translate-y-9 dark:bg-white " >
                    Link Title
                  </span>
                </label>
              </div>

              <div className='w-full mt-3'>

                <label htmlFor="link" className="relative">
                  <input
                    value={link}
                    onClick={() => { }}
                    onChange={(e) => { setlink(e.target.value) }}
                    type="text"
                    id="link"
                    placeholder=""
                    className="peer p-2 text-lg  mt-2 w-full rounded-lg border   dark:border-gray-600 dark:bg-white dark:text-gray-900 "
                  />

                  <span className="absolute rounded px-1 inset-y-2 start-1 -translate-y-9 bg-white  font-medium  transition-transform h-6 peer-placeholder-shown:-translate-y-3 peer-focus:-translate-y-9 dark:bg-white " >
                    Link Url
                  </span>
                </label>
              </div>
              <button

                onClick={() => { addLink() }} className='bg-purple-700 text-white p-2 rounded-xl mt-2'>Add link</button>
            </>}
            <div className='w-full flex gap-2 mt-3 items-center justify-start flex-wrap'>

              {links && links.map((item, index) => {
                return (<div key={item.link} target='_blank' onClick={() => removeItem(item.linktext)} className={`text-white bg-purple-400 p-2 rounded-xl font-semibold`}>{item.linktext} </div>)

              })}
            </div>







          </>}



          <button className='bg-white border p-2 my-2 rounded-lg w-full  md:w-full' onClick={() => {
            setedit(!edit)
            if (edit) {

              UpdateProfile()
            }
          }}>{!edit ? "Edit Profile" : "Save"}</button>
        </aside>




        <main className='main rounded-lg w-full h-fit lg:w-2/3 bg-gray-100 flex p-5 gap-5 flex-wrap justify-evenly'>

          <div className="supporters  lg:w-1/2 w-full   ">
            <h1 className='text-2xl font-bold mb-3 text-purple-700 '>Supporters</h1>
            <div className='saperator bg-gray-400 w-full my-1 h-[1px]'></div>
            {/* list all supporters as leaderboard */}
            <ul className='min-h-[30vh] max-h-[50vh] lg:max-h-[60vh] overflow-y-scroll no-scrollbar bg-white p-3 rounded-lg mt-5'>
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
    </>)
  }
}

export default Profile
