"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Account ({params}) {
  // console.log('5 client params :>> ', params);
  const { _id } = params;

  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

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
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Account