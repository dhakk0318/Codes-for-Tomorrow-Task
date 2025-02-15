import express from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/userLoginRoutes";
import { authenticateSocket } from "./middlewares/socketAuth";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

io.use(authenticateSocket);
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
