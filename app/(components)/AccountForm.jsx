"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AccountForm = () => {
  const router = useRouter();

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const defaultAccount = {
    account_name: "",
    account_type: "Checking",
    tags: selectedTags
  }

  const [formData, setFormData] = useState(defaultAccount);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch("/api/tags");
      const data = await res.json();
      console.log('line 25 data.data :>> ', data.data);
      setTags(data.data);
    };
  
    fetchTags();
  }, [])

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: selectedTags,
    }))

  }, [selectedTags])
  
  

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleTagChange = (tagId) => {
    console.log('line 43 tagId :>> ', tagId);
    console.log('line 44 selectedTags :>> ', selectedTags);
    setSelectedTags((prevSelected = []) => {
      console.log('prevSelected :>> ', prevSelected);
      const updatedTags = prevSelected.includes(tagId)
        ? prevSelected.filter((id) => id !== tagId)
        : [...prevSelected, tagId]
      return updatedTags;
    });
    console.log('line 49 tagId :>> ', tagId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    console.log('line 54 formData :>> ', formData);
    const res = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({formData}),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      setFormData(defaultAccount);
      setSuccessMessage("ACCOUNT CREATED");
      setErrorMessage("");
      router.refresh();
      router.push("/create-account");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
        >
        <h1>Create New Account</h1>
        <label>Account Name</label>
        <input
          id="account_name"
          name="account_name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.account_name}
          className="m-2 bg-slate-400 rounded" />
        <label>Account Type</label>
        <input
          id="account_type"
          name="account_type"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.account_type}
          className="m-2 bg-slate-400 rounded" />
        <fieldset>
            <legend>Select Tags:</legend>
            {tags.map((tag) => (
              <label key={tag._id}>
                <input
                  type="checkbox"
                  value={tag._id}
                  onChange={() => handleTagChange(tag._id)}
                />
                {tag.tag_name}
              </label>
            ))}
        </fieldset>
        <input
          type="submit"
          value="Create Account"
          className="bg-blue-300 hover:bg-blue-100" />
      </form>
      <p className="text-red-500">{errorMessage}</p>
      <p className="text-green-500">{successMessage}</p>
    </>
  )
}

export default AccountForm;