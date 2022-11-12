import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import socketIOClient from "socket.io-client";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Private from "./components/Private";
import Signup from "./components/Signup";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:3070/");
    socket.on("message", (data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              {" "}
              <Home />
            </Private>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
      <h1>{data}</h1>
    </div>
  );
};

export default App;
