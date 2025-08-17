import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: [process.env.CLIENT_URL], credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("joinMenuRoom", ({ storeId = "default" } = {}) => {
      const room = `store:${storeId}:menu`;
      socket.join(room);
      console.log(socket.id, "joined", room);
    });

    socket.on("leaveMenuRoom", ({ storeId = "default" } = {}) => {
      socket.leave(`store:${storeId}:menu`);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected", socket.id);
    });
  });
  return io;
}
export function getIO() {
  return io;
}
