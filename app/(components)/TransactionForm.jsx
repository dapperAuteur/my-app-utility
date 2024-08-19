"use client"

import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react"
import React, { useState } from "react";
import {findUserByEmail} from "../utils/findUser";

const TransactionForm = () => {
  // const { data: session} = useSession();
  // console.log('session :>> ', session);
  // const userEmail = session.user.email;
  // console.log('userEmail :>> ', userEmail);
  const route = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // get user by email
  // let user = findUserByEmail(userEmail);
  // console.log('user :>> ', user);

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
    // console.log('user :>> ', user);
    const res = await fetch("/api/Transactions", {
      method: "POST",
      body: JSON.stringify({formData}),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/CreateTransaction");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
        >
          <h2>Document New Transaction</h2>
          <label>Account</label>
          <input
            id="account"
            name="account"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.account}
            className="m-2 bg-slate-400 rounded"/>
          <label>Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            onChange={handleChange}
            required={true}
            value={formData.amount}
            className="m-2 bg-slate-400 rounded"/>
          <label>Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.description}
            className="m-2 bg-slate-400 rounded"/>
          <label>Relevance</label>
          <input
            id="relevance"
            name="relevance"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.relevance}
            className="m-2 bg-slate-400 rounded"/>
          <label>Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.category}
            className="m-2 bg-slate-400 rounded"/>
          <label>Date</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            onChange={handleChange}
            required={true}
            value={formData.date}
            className="m-2 bg-slate-400 rounded"/>
          <input
            type="submit"
            value="Create Transaction"
            className="bg-blue-300 hover:bg-blue-100"/>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  )
}

export default TransactionForm;