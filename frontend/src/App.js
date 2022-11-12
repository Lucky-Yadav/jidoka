import React, { useEffect } from 'react'
import { useState } from 'react'
import socketIOClient from 'socket.io-client'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:3070/")  
    socket.on("message", (data) => {
      setData(data)
    })
  
  }, [])
  
  return (
    <div>
      <h1>{ data}</h1>
    </div>
  )
}

export default App