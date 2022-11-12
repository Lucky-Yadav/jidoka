import express from "express";
import http from 'http';
import * as socketio from 'socket.io';
const PORT = 3070;
import mongoose from "mongoose";

const app = express()

mongoose
  .connect(
    "mongodb+srv://user:wGPrQ0iGQM3rO4nZ@cluster0.zkwpvpy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("handshake successful");
   
  })
  .catch((err) => {
    console.log(err);
  });

const server = new socketio.Server({
  cors: {
         origin: "*"
       }
})
let timechange
server.on("connection", (socket) => {
  console.log("connected")
  if (timechange) clearInterval(timechange)
    setInterval(() => {
      socket.emit("message", new Date());
    }, 1000);
  
})
const httpserver = http.createServer(app)
    httpserver.listen(PORT)