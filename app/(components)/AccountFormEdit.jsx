"use client"

// how to set selected tags on initial load to show the tags the account has before changes are made.
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AccountFormEdit = ({account}) => {
  console.log('7 AccountFormEdit account :>> ', account);
  const router = useRouter();

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(account.tags || []);

  const [formData, setFormData] = useState({
    _id: account._id,
    account_name: account.account_name,
    account_type: account.account_type,
    tags: account.tags || [],
  })

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log('selectedTags :>> ', selectedTags);
  console.log('account.tags :>> ', account.tags);
  // Fetch all available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags");
        const data = await res.json();
        console.log('line 25 data.data :>> ', data.data);
        setTags(data.data);
      } catch (error) {
        console.error("Failed to fetch tags", err);
        setErrorMessage(`Failed to fetch tags. Error: ${error}`)
      }
    };
  
    fetchTags();
  }, [])

  // Sync selectedTags with formData
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: selectedTags,
    }))

  }, [selectedTags])

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log('15 AccountFormEdit formData :>> ', formData);
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
    console.log('25 AccountFormEdit formData :>> ', formData);
    const res = await fetch(`/api/accounts/${formData._id}`, {
      method: "PATCH",
      body: JSON.stringify({formData}),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      console.log('33 AccountFormEdit response :>> ', response);
      setErrorMessage(response.message);
    } else {
      // setFormData(defaultAccount);
      setSuccessMessage("ACCOUNT UPDATED");
      setErrorMessage("");
      router.refresh();
      router.push(`/accounts/${account._id}`);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="patch" //BLOG ensure method here matches method used in handle submit
        className="flex flex-col gap-3 w-1/2"
        >
        <h1>Edit {formData.account_name} Account</h1>
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
                    checked={selectedTags.includes(tag._id)}
                    onChange={() => handleTagChange(tag._id)}
                  />
                  {tag.tag_name}
                </label>
              ))}
          </fieldset>
        <input
          type="submit"
          value="Edit Account"
          className="bg-blue-300 hover:bg-blue-100" />
      </form>
      <p className="text-red-500">{errorMessage}</p>
      <p className="text-green-500">{successMessage}</p>
      <Link href={`/accounts/${account._id}`}>
        <button className="bg-red-500 hover:bg-red-200">Cancel</button>
      </Link>
    </>
  )
}

export default AccountFormEdit;