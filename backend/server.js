const express = require("express");
const  http = require("http");
const socketio = require("socket.io");
const PORT = 3070;
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
mongoose
  .connect(
    "mongodb+srv://jidoka:cOrlTr9f2O90sEC7@cluster0.fgnu9q7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("handshake successful");
  })
  .catch((err) => {
    console.log(err);
  });
const httpserver = http.createServer(app);
const server = new socketio.Server(httpserver, {
  cors: {
    origin: "*",
  },
});
let timechange;
server.on("connection", (socket) => {
  console.log("connected");
  if (timechange) clearInterval(timechange);
  setInterval(() => {
    socket.emit("message", new Date());
  }, 1000);
});
httpserver.listen(PORT);
