"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TagFormEdit = ({session, tag}) => {
  // console.log('session :>> ', session);
  // console.log('tag :>> ', tag);
  const { _id } = tag;
  const router = useRouter();
  const [formData, setFormData] = useState(tag);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('27 TagFormEdit formData :>> ', formData);
    setErrorMessage("");

    const res = await fetch(`/api/tags/${formData._id}`, {
      method: "PATCH",
      body: JSON.stringify({formData}),
      "content-type": "application/json"
    });
    console.log('client 34 res :>> ', res);

    if (!res.ok) {
      const response = await res.json();
      console.log('38 response :>> ', response);
      setSuccessMessage("");
      setErrorMessage(response.message);
      setFormData(formData);
      router.push(`/tags/${_id}/edit`);
    } else {
      setErrorMessage("");
      setSuccessMessage("TAG UPDATED");
      setFormData({})
      router.refresh();
      router.push(`/tags/${_id}`);
      }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="patch"
        className="m-2 flex flex-col gap-3 w-1/2"
        >
        <label htmlFor="tag_name">Tag Name</label>
        <input
          className="my-2 bg-slate-400"
          id="tag_name"
          name="tag_name"
          onChange={handleChange}
          required={true}
          type="text"
          value={formData.tag_name}
          />
        <label htmlFor="description">Description</label>
        <input
          className="my-2 bg-slate-400"
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          type="text"
          value={formData.description}
          />
        <input onClick={handleSubmit} type="submit" className="submit" name="Submit Form" />
      </form>
      <Link href={`/tags/${tag._id}`} className="bg-red-500">Cancel</Link>
      <p className="text-red-500">{errorMessage}</p>
      <p className="text-green-500">{successMessage}</p>
    </div>
  )
}

export default TagFormEdit