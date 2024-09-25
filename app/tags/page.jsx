"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

function Tags() {
  const { data: session } = useSession();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log('session :>> ', session);

  const handleDelete = async (session, tagId) => {
    if (!session) {
      setErrorMessage({message: "Tag NOT DELETED! Must be Admin to delete Tag."});
      return
    }
    console.log('tagId :>> ', tagId);
    try {
      const res = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE",
        body: JSON.stringify(session),
        "content-type": "application/json",
      });
      setTags(tags.filter(tag => tag._id !== tagId));
      console.log('tags :>> ', tags);
      setSuccessMessage(res.statusText);
    } catch (error) {
      console.log('error :>> ', error);
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    fetch('/api/tags')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTags(data.data);
        setIsLoading(false);
      })
  }, [])

  // console.log('0 tags :>> ', tags); // why does this happen so many times?
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!tags) {
    return <p>No Tags Data</p>
  }
  
  return (
    <div className='m-2'>
      <h3>Tag List</h3>
      <p className='text-red-500'>{errorMessage.message}</p>
      <p className='text-green-500'>{successMessage}</p>
      {
        tags.map(tag => (
          <div className='border-double border-2 m-2' key={tag._id}>
            <Link href={`/tags/${tag._id}`}>
              <div>Name: {tag.tag_name}</div>
              <div>Description:{tag.description}</div>
            </Link>
            <Link href={`/tags/${tag._id}/edit`} className='m-2'>Edit</Link>
            <button onClick={() => handleDelete(session, tag._id)} className='m-2'>Delete</button>
          </div>
        ))
      }
      
    </div>
  )
}

export default Tags