import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  // State management store
  // This can be a simple in-memory store or a more complex state management solution
  const state = {
    isAdmin: false,
    roomID: null,
    players: [],
    currentPlayer: null,
    currentQuestion: null,
    questions: [],
  };

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("create:room", (roomId) => {
      console.log("Room created:", roomId);
      state.roomID = roomId;
      // Join the room
      socket.join(roomId);
      // Send the current state to the new client
      socket.emit("state:list", state);
    })

    socket.on("join:room", (roomId) => {
      console.log("Room joined:", roomId);
      // Join the room
      if (state.roomID === roomId) {
        socket.join(roomId);
        io.to(roomId).emit("state:list", state);
      }
      // Send the current state to the new client
    })

    // // Send the current state to the new client
    // io.to(state.roomID).emit("state:list", state);

    socket.on("update:player", (data) => {
      const { playerName, roomID } = data;

      if (state.roomID !== roomID) {
        // Prevent duplicates
        if (!state.players.includes(playerName)) {
          state.players.push(playerName);
          console.log("Player update received:", state);
          // Broadcast updated player list to all clients
          io.to(state.roomID).emit("state:list", state);
        }
      }
    });

    socket.on("state:request", () => {
      io.to(state.roomID).emit("state:list", { players: state.players });
    });
    // return () => {
    //   socket.off("state:list")
    //   socket.off("update:player")
    // }
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
