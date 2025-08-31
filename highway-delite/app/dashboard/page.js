"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const Dashboard = () => {
    const [createNote, setcreateNote] = useState(false)
    const [Createnotes, setCreatenotes] = useState({ title: "", content: "" })
    const [Notes, setNotes] = useState([])
    const { data: session } = useSession()

    console.log(session)


    const handleChange = (e) => {
        setCreatenotes({ ...Createnotes, [e.target.name]: e.target.value })

    }

    useEffect(() => {
      
    
      
    }, [])
    

    const handleCreateNote = () => {
        if(Createnotes.title===""){
            toast.info("Please give some title")
            return;
        }
        if(Createnotes.content===""){
            toast.info("Please give some title")
            return;
        }




        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": session.user.email,
            "title": Createnotes.title,
            "content": Createnotes.content
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/savenotes", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        toast.success("Save successful")
        setcreateNote(false)
        setCreatenotes({ title: "", content: "" })

    }



    //     if (!session) {
    //     redirect('/login')
    //   }

    // async function createNote(data) {
    //     const res = await fetch('/api/notes', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     });
    //     return res.json();
    // }



    return (
        <div className='w-full h-screen flex flex-col gap-4 py-2'>
            <ToastContainer />
            <div className='flex flex-col items-start justify-center gap-2 p-3  m-3 rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] w-9/10 mx-auto'>
                <h3 className='text-xl font-semibold'>Welcome,{session?.user.name || "Highway Delight"}</h3>
                <h3 className=''>Email:{session?.user.email || "saksham@gmail.com"}</h3>
            </div>




            {!createNote && <button className='bg-blue-500 w-9/10 mx-auto p-3 text-xl font-bold text-white rounded-xl' onClick={() => { setcreateNote(true) }}>Create Note </button>}
            {createNote && <div className='flex flex-col lg:flex-row items-start justify-center gap-4 w-9/10 mx-auto shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] p-4 rounded-lg'>
                <input type="text" name='title' value={Createnotes.title} onChange={handleChange} className='border-1 w-full p-2 rounded-lg' placeholder='Enter title' />
                <textarea type="text" value={Createnotes.content} onChange={handleChange} name='content' className='border-1 w-full p-2 rounded-lg' placeholder='Enter Note' />
                <div className='flex justify-between w-full'>

                <button className='bg-blue-500 p-2 text-white rounded-lg' onClick={() => { handleCreateNote() }}>Save Note</button>
                <button className='bg-orange-500 p-2 text-white rounded-lg' onClick={() => { setcreateNote(false),setCreatenotes({ title: "", content: "" }) }}>Reset</button>
                </div>
            </div>}




            <div className=''>
                <h2 className='text-2xl font-bold text-center'>Your Notes</h2>
                <div className='w-9/10 mx-auto h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {/* Note Card */}
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] '>
                        <div className='flex justify-between items-start gap-2'>


                            <h3 className='text-xl font-semibold'>Note Title</h3>

                            <img src="delete.svg" alt="" />
                        </div>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
                        <h3 className='text-xl font-semibold'>Note Title</h3>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
                        <h3 className='text-xl font-semibold'>Note Title</h3>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
                        <h3 className='text-xl font-semibold'>Note Title</h3>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
                        <h3 className='text-xl font-semibold'>Note Title</h3>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
                        <h3 className='text-xl font-semibold'>Note Title</h3>
                        <p className='mt-2'>This is a sample note content. It provides a brief overview of the note's subject matter.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
