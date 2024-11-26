"use client"
import React, { useState } from 'react'
import Link from 'next/link';

function Tag(tag) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = async (session, tagId) => {
    console.log('tagId :>> ', tagId);
    if (!session) {
      setErrorMessage("Tag NOT DELETED! Must be Admin to delete Tag.");
      return;
    }
    try {
      const res = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE",
        body: JSON.stringify(session),
        "content-type": "application/json",
      });
      setSuccessMessage(res.statusText);
      router.refresh();
      router.push("/tags/");
    } catch (error) {
      console.log('error :>> ', error);
      setErrorMessage(error);
    }
  }
  
  return (
    <div className='m-2'>
      <p className='text-green-500'>{successMessage}</p>
      <p className='text-red-500'>{errorMessage}</p>
      <h3>{tag.tag_name}</h3>
      <h3>{tag.description}</h3>
      { session ? 
        <div>
          <div>
            <Link href={`/tags/${tag._id}/edit`}>
              Edit
            </Link>
          </div>
          <div className='border-double border-2' onClick={
            () => handleDelete(session, tag_id)
            }>
              <button>Delete</button>
          </div>
        </div> : ""}
    </div>
  )
}

export default Tag