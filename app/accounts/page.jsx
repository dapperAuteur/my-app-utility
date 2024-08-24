"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  // refactor so there isn't redundant code
  // same code is in `/accounts/[_id]/page`
  const handleDelete = async (accountId) => {
    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "DELETE",
        "content-type": "application/json",
      });
      setAccounts(accounts.filter(account => account._id !== accountId));
      console.log('res :>> ', res.statusText);
      setMessage(res.statusText);
    } catch (error) {
      console.error('Failed to delete the account', error);
      console.log('16 app/accounts/page error :>> ', error);;
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    fetch('/api/accounts')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('27 app/accounts/page data :>> ', data);
        setAccounts(data.accounts);
        setIsLoading(false)
      })
  }, []);
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!accounts) {
    <p>No Account Data</p>
  }
  
  return (
    <div>
      <h1>Accounts List</h1>
      <br/>
      <hr/>
      <p className='text-red-500'>{errorMessage}</p>
      <p className='text-green-500'>{message}</p>
      {
        accounts.map((account) => (
          <div className='border-double border-2' key={account._id}>
            <Link href={`/accounts/${account._id}`}>
              <h3>{account.account_name}</h3>
              <h4>{account.account_type}</h4>
            </Link>
            <div>
              <Link className='border-double border-2' href={`/accounts/${account._id}/edit`}>Edit</Link>
            </div>
            <div>
              <button className='border-double border-2'
                onClick={() => handleDelete(account._id)}
                >Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Accounts