"use client"
// this gives access to params
import React, { useEffect, useState } from 'react'
import Link from 'next/link';


function Tag({params}) {
  // console.log('client params :>> ', params);
  const { _id } = params;

  const [tag, setTag] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tag) {
    return <div>Loading...</div>;
  }  

  return (
    <div className='m-2'>
      <h2>Tag</h2>
      <h3>{tag.tag_name}</h3>
      <h3>{tag.description}</h3>
      <div>
        <Link href={`/tags/${tag._id}/edit`}>Edit</Link>
      </div>
      <div>
        <button className='border-double border-2'
          onClick={() => handleDelete(tag._id)}
          >Delete</button>
      </div>
    </div>
  )
}

export default Tag