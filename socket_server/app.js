const app = require("express");
const http = require("http").createServer(app);
var io = require("socket.io")(http);
rooms = {};

io.on("connection", (socket) => {
  console.log("new client connected", socket.id);

  socket.on("DM_join", (sessionId) => {
    console.log("DM_join", sessionId);
    socket.join(sessionId);
    if (!rooms[sessionId]) {
      rooms[sessionId] = {
        users: [],
        DMID: socket.id,
      };
    }
  });

  socket.on("user_join", (charId, charName, sessionId, health, max_health) => {
    console.log("char joined", charId, charName, sessionId, health, max_health);
    if (!rooms[sessionId]) {
      io.to(socket.id).emit("Room_closed");
      return;
    }
    rooms[sessionId].users.push({
      id: socket.id,
      charId: charId,
    });
    socket.join(sessionId);
    io.to(rooms[sessionId].DMID).emit("user_join", {
      charId: charId,
      charName: charName,
      health: health,
      max_health: max_health,
    });
  });

  socket.on("healthChange", (val, sessionId, charId) => {
    console.log("healthChange", sessionId, charId, val);
    for (user of rooms[sessionId].users) {
      if (user.charId === charId) {
        io.to(user.id).emit("healthChange", val);
      }
    }
  });

  socket.on("room_close", (sessionId) => {
        console.log("room_close", sessionId);
        delete rooms[sessionId];
    });

  socket.on("disconnect", (sessionId) => {
    console.log("Disconnect Fired");
    console.log(sessionId);
    if (!rooms[sessionId]) {
      return;
    }
    for (user of rooms[sessionId].users) {
      if (user.id === socket.id) {
        console.log(user.name, socket.id);
        io.to(rooms[sessionId].DMID).emit("user_left", user.name);
        rooms[sessionId].splice(rooms[sessionId].indexOf(user), 1);
        // if (rooms[sessionId].length === 0) {
        //   delete rooms[sessionId];
        // }
      }
    }
  });

  socket.on("user_left", (sessionId, charId) => {
    console.log("User Left");
    console.log(`sessionId ${sessionId}`);
    if (!rooms[sessionId]) {
      return;
    }
    io.to(rooms[sessionId].DMID).emit("user_left", {
      charId: charId,
    });
    for (user of rooms[sessionId].users) {
      if (user.id === socket.id) {
        console.log(user.name, socket.id);
        rooms[sessionId].users.splice(rooms[sessionId].users.indexOf(user), 1);
        // if (rooms[sessionId].users.length === 0) {
        //   delete rooms[sessionId];
        // }
      }
    }
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});
