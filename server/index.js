const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors());
var data = "this is temp data";

// database temp data
var user_data = [];
let intervalId = null;
// sending data every 2 seconds
// mannageing users data

function start_sending_data() {
  intervalId = setInterval(() => {
    process.stdout.write(".");
    if (user_data.length === 0) {
      stop_sending_data();
      console.log("stoped_sending_data");
    } else {
      socketIO.emit("users_coords_list", user_data);
      user_data = [];
    }
  }, 2000);
}

function stop_sending_data() {
  clearInterval(intervalId);
  intervalId = null;
}

function collect_users_data(new_coord) {
  if (new_coord.userid == undefined) return;
  user_data.push(new_coord);

  // if (user_data.length === 0) {
  //   console.log("stop_sending_data");
  //   stop_sending_data();
  // } else
  if (intervalId == null) {
    console.log("\nstart_sending_data");
    start_sending_data();
  }
}

socketIO.on("connection", socket => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("user_coords", data => {
    // console.log("data:", data);
    collect_users_data(data);
  });

  socket.on("disconnect", () => {
    console.log("   🔥: A user disconnected");
    // socketIO.emit("newUserResponse", "this is new user responce")
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
