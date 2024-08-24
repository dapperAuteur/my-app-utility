"use client"
import React, { useEffect, useState } from 'react'
import AccountFormEdit from '../../../(components)/AccountFormEdit'

function EditAccount({params}) {
  console.log('6 EditAccount params :>> ', params);
  const {_id} = params;
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetch(`/api/accounts/${_id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('18 data :>> ', data);
        setAccount(data.account[0]);
        setIsLoading(false)
      })
  }, []);
  console.log('27 EditAccount account :>> ', account);

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!account) {
    <p>No Account Data</p>
  }

  return (
    <div>
      <h2>Edit Account Form</h2>
      <AccountFormEdit account={account} />
    </div>
  )
}

export default EditAccount