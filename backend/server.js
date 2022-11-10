const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

var connection_string = "**********";
// Connection string of MongoDb database hosted on Mlab or locally
// Collection name should be "FoodItems", only one collection as of now.
// Document format should be as mentioned below, at least one such document:
// {
//     "_id": {
//         "$oid": "5c0a1bdfe7179a6ca0844567"
//     },
//     "name": "Veg Roll",
//     "predQty": 100,
//     "prodQty": 295,
//     "ordQty": 1
// }

const db = require("monk")(connection_string);

const collection_foodItems = db.get("FoodItems");

const port = process.env.PORT || 3002;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("initial_data", () => {
    collection_foodItems.find({}).then((docs) => {
      io.sockets.emit("get_data", docs);
    });
  });
    
  socket.on("putOrder", (order) => {
    collection_foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then((updatedDoc) => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("mark_done", (id) => {
    collection_foodItems
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then((updatedDoc) => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("ChangePred", (predicted_data) => {
    collection_foodItems
      .update(
        { _id: predicted_data._id },
        { $set: { predQty: predicted_data.predQty } }
      )
      .then((updatedDoc) => {
        io.sockets.emit("change_data");
      });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static("build"));
app.use("/kitchen", express.static("build"));
app.use("/updatepredicted", express.static("build"));

server.listen(port, () => console.log(`Listening on port ${port}`));
