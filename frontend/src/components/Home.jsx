import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Home = () => {
  
  const [data, setData] = useState([]);

   useEffect(() => {
     const socket = socketIOClient("http://127.0.0.1:3070/");
     socket.on("message", (data) => {
       setData(data);
     });
   }, []);
    
  return (
    <div className='data'>
      Data Updating by socket.io
    <br />
      {data}
    </div>
  );
}

export default Home