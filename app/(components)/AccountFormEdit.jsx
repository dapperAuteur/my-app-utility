"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AccountFormEdit = ({account}) => {
  console.log('7 AccountFormEdit account :>> ', account);
  const router = useRouter();
  const [formData, setFormData] = useState(account);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log('15 AccountFormEdit formData :>> ', formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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
      setFormData({});
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
        <h1>Edit {formData.accountName} Account</h1>
        <label>Account Name</label>
        <input
          id="accountName"
          name="accountName"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.accountName}
          className="m-2 bg-slate-400 rounded" />
        <label>Account Type</label>
        <input
          id="accountType"
          name="accountType"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.accountType}
          className="m-2 bg-slate-400 rounded" />
        <input
          type="submit"
          value="Edit Account"
          className="bg-blue-300 hover:bg-blue-100" />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  )
}

export default AccountFormEdit;