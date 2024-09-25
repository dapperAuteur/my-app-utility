"use client"
// this gives access to params
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function Tag({params}) {
  // console.log('client params :>> ', params);
  const router = useRouter();
  const { _id } = params;
  const { data: session } = useSession();

  const [tag, setTag] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  useEffect(() => {
    async function fetchTag() {
      try {
        const res = await fetch(`/api/tags/${_id}`);
        // what happens when you fetch(`/tags/${_id}`); instead, the server logs the client
        if (!res.ok) {
          throw new Error("Failed to fetch Tag");
        }
        const result = await res.json();
        // console.log('result :>> ', result);
        setTag(result.tag[0]);
      } catch (error) {
        setError(error.message);
      }
    } 
    fetchTag();
  }, [_id]);
  
  // console.log('client tag :>> ', tag);

  if (!tag) {
    return <div>Loading...</div>;
  }  

  return (
    <div className='m-2'>
      <Link href={"/tags"}><h2>Tag</h2></Link>
      <p className='text-red-500'>{errorMessage}</p>
      <p className='text-green-500'>{successMessage}</p>
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