"use client"
import React, { useEffect } from 'react'

function DBCheck() {
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('data :>> ', data);
      })
  }, [])

  return (
    <div>
      <h2>DB Check</h2>
      <p>Check the database for any errors or inconsistencies.</p>
    </div>
  )
}

export default DBCheck