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
    const [confirm, setconfirm] = useState("")

    // console.log(session)

    if (!session) {
        redirect("/")
    }

    const getNotes = async () => {

        const requestOptions = {
            method: "GET",
        };

        await fetch(`http://localhost:3000/api/getnotes/${session.user.email}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result-->>", result.Notes)
                setNotes(result.Notes)

            })
            .catch((error) => console.error(error));



    }


    const handleChange = (e) => {
        setCreatenotes({ ...Createnotes, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        getNotes()

    }, [])




    const handleCreateNote = () => {
        if (Createnotes.title === "") {
            toast.info("Please give some title")
            return;
        }
        if (Createnotes.content === "") {
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
        getNotes()

    }


    const deleteNote = (noteId) => {
        console.log(noteId)
        







        const raw = "";

        const requestOptions = {
            method: "DELETE",
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:3000/api/deletenote/${noteId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        toast.success("Note Deleted")
        getNotes()


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
            {createNote && <div className='flex flex-col items-start justify-center gap-4 w-9/10 mx-auto shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] p-4 rounded-lg'>
                <input type="text" name='title' value={Createnotes.title} onChange={handleChange} className='border-1 w-full p-2 rounded-lg' placeholder='Enter title' />
                <textarea type="text" value={Createnotes.content} onChange={handleChange} name='content' className='border-1 w-full p-2 rounded-lg' placeholder='Enter Note' />
                <div className='flex justify-between w-full'>

                    <button className='bg-blue-500 p-2 text-white rounded-lg' onClick={() => { handleCreateNote() }}>Save Note</button>
                    <button className='bg-orange-500 p-2 text-white rounded-lg' onClick={() => { setcreateNote(false), setCreatenotes({ title: "", content: "" }) }}>Reset</button>
                </div>
            </div>}




            <div className=''>
                <h2 className='text-2xl font-bold text-center'>Your Notes</h2>
                {Notes.length == 0 && <div className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] w-9/10 mx-auto text-center mt-2 '>No Note yet</div>}
                <div className='w-9/10 mx-auto h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {/* Note Card */}




{confirm && <div className='absolute top-[30%] left-[30%] flex flex-col justify-center gap-10 lg:h-[40vh] lg:w-[40vw] bg-white p-4 border border-blue-500 rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)]'>
    <p className='text-2xl lg:text-4xl text-center font-bold'>Are you sure?</p>
    <div className='flex justify-around mt-4'>
        <button className='p-2 bg-white text-green-500 font-semibold mx-2 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white' onClick={()=>{setconfirm("")}} type="button">Cancle</button>
        <button className='p-2 bg-white text-red-500 font-semibold mx-2 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white' onClick={()=>{deleteNote(confirm),setconfirm(false)}} type="button">Delete</button>
    </div>
</div>}
                    
                    {Notes.map((item, index) => {
                        return <div key={index} className='p-4 border rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] '>
                            <div className='flex justify-between items-start gap-2'>


                                <h3 className='text-xl font-semibold'>{item.title}</h3>

                                <img src="delete.svg" alt="" onClick={() => {setconfirm(item._id)}} />
                            </div>
                            <p className='mt-2'>{item.content}</p>
                        </div>
                    })}







                </div>
            </div>
        </div>
    )
}

export default Dashboard
