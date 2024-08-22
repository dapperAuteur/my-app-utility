"use client"
import React, { useEffect, useState } from 'react'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/accounts')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('data :>> ', data);
        setAccounts(data);
        setIsLoading(false)
      })
  
    // return () => {
    //   second
    // }
  }, []);
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!accounts) {
    <p>No Account Data</p>
  }
  
  return (
    <div>
      <h1>Accounts</h1>
      <h3>{accounts.accounts[0].accountName}</h3>
      <h4>{accounts.accounts[0].accountType}</h4>
    </div>
  )
}

export default Accounts