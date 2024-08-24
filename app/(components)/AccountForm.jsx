"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AccountForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    "accountName": "",
    "accountType": "Checking",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({formData}),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      setFormData({});
      setSuccessMessage("ACCOUNT CREATED");
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
          value="Create Account"
          className="bg-blue-300 hover:bg-blue-100" />
      </form>
      <p className="text-red-500">{errorMessage}</p>
      <p className="text-green-500">{successMessage}</p>
    </>
  )
}

export default AccountForm;