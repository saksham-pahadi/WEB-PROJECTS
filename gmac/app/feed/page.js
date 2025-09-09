"use client"
import React from 'react'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const page = () => {
    const { data: session } = useSession()


    // if (!session) {
    //     redirect("/login")
    // }
  return (
    <div>
      {session && <div>{session.user.email}</div> }
      feed
    </div>
  )
}

export default page
