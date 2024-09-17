"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const TagForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    "tag_name": "",
    "description": ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch(`/api/tags`, {
      method: "POST",
      body: JSON.stringify({formData}),
      "content-type": "application/json"
    });
    if (!res.ok) {
      const response = await res.json();
      setSuccessMessage("");
      setErrorMessage(response.message);
      setFormData(formData);
    } else {
      setFormData({
        "tag_name": "",
        "description": ""
      })
      setSuccessMessage("TAG CREATED");
      setErrorMessage("");
      router.refresh();
      router.push("/create-tag");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
        >
        <label htmlFor="tag_name">Name</label>
        <input
          className="m-2 bg-slate-400 rounded"
          id="tag_name"
          name="tag_name"
          onChange={handleChange}
          required={true}
          type='text'
          value={formData.tag_name}
          />
        <label htmlFor="description">Description</label>
        <input
          className="m-2 bg-slate-400 rounded"
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          type='text'
          value={formData.description}
          />
        <input
          type='submit'
          value="Create Tag"
          className="bg-blue-300 hover:bg-blue-100"
          />
      </form>
      <p className="text-red-500">{errorMessage}</p>
      <p className="text-green-500">{successMessage}</p>
    </div>
  )
}

export default TagForm