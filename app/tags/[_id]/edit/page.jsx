"use client"
import React, { useEffect, useState } from 'react'
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import TagFormEdit from '../../../(components)/TagFormEdit'

function EditTag({params}) {
  // console.log('params :>> ', params);
  const { _id } = params;
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/tags/${_id}/edit`)
    }
  })
  const [tag, setTag] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tags/${_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTag(data.tag[0]);
        setIsLoading(false);
      })
  }, [])
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!tag) {
    <p>No Tag Data</p>
  }

  return (
    <div className='m-2'>
      <h3>Edit {tag.tag_name} Tag</h3>
      <TagFormEdit session={session} tag={tag} />
    </div>
  )
}

export default EditTag