"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Account ({params}) {
  // console.log('5 client params :>> ', params);
  const { _id } = params;

  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  // refactor so there isn't redundant code
  // same code is in `/accounts/page`
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
    async function fetchAccount() {
      try {
        const res = await fetch(`/api/accounts/${_id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch Account");
        }
        const result = await res.json();
        // console.log('result :>> ', result);
        setAccount(result.account[0]);
      } catch (error) {
        console.log('error :>> ', error);
        setError(error.message);
      }
    }
    fetchAccount();
  
  }, [_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!account) {
    return <div>Loading...</div>;
  }  

  return (
    <div>
      <h2>Account</h2>
      <h3>{account.accountName}</h3>
      <h3>{account.accountType}</h3>
      <div>
        <Link href={`/accounts/${account._id}/edit`}>Edit</Link>
      </div>
      <div>
        <button className='border-double border-2'
          onClick={() => handleDelete(account._id)}
          >Delete</button>
      </div>
    </div>
  )
}

export default Account