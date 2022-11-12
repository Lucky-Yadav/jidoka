import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
    
  return (
    <div>
      <h3> Name :- { username}</h3>
      <h3> Email :- { email}</h3>
    </div>
  );
}

export default Home