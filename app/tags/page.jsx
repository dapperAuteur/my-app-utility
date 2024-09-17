"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
// import Tag from '../(models)/Tag';

function Tags() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async (tagId) => {
    // console.log('tagId :>> ', tagId);
    try {
      const res = await fetch(`/api/tags/${tag._id}`, {
        method: "DELETE",
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
      <p>{errorMessage}</p>
      <p>{successMessage}</p>
      {
        tags.map(tag => (
          <div className='border-double border-2 m-2' key={tag._id}>
            <Link href={`/tags/${tag._id}`}>
              <div>Name: {tag.tag_name}</div>
              <div>Description:{tag.description}</div>
            </Link>
            <Link href={`/tags/${tag._id}/edit`} className='m-2'>Edit</Link>
            <button onClick={() => handleDelete(tag._id)} className='m-2'>Delete</button>
          </div>
        ))
      }
      
    </div>
  )
}

export default Tags