"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import { useState } from 'react';

const Dashboard = () => {
    const [createNote, setcreateNote] = useState(false)

    async function createNote(data) {
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    }



    return (
        <div className='w-full h-screen flex flex-col gap-4 py-2'>
            <div className='flex flex-col items-start justify-center gap-2 p-3  m-3 rounded-lg shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] w-9/10 mx-auto'>
                <h3 className='text-xl font-semibold'>Welcome, Saksham kushwaha</h3>
                <h3 className=''>Email: saksham@gmail.com</h3>
            </div>
            <button className='bg-blue-500 w-9/10 mx-auto p-3 text-xl font-bold text-white rounded-xl' onClick={() => { setcreateNote(true) }}>Create Note </button>
            {createNote && <div className='flex flex-col md:flex-row items-start justify-center gap-4 w-9/10 mx-auto shadow-[-1px_3px_6px_5px_rgba(0,_0,_0,_0.1)] p-4 rounded-lg'>
                <input type="text" className='border-1 w-full p-2 rounded-lg' placeholder='Enter title' />
                <textarea type="text" className='border-1 w-full p-2 rounded-lg' placeholder='Enter Note' />
                <button className='bg-blue-500 p-2 text-white rounded-lg' onClick={() => { setcreateNote(false) }}>Save Note</button>
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
