"use client"
import React from 'react'
import TagForm from "../(components)/TagForm";
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';

function Tag() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/create-tag')
    }
  })
  return (
    <div>
      <h2>Create New Tag</h2>
      <TagForm session={session}/>
    </div>
  )
}

export default Tag