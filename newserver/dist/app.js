"use strict";
// import express from "express";
// import cookieParser from "cookie-parser";
// import { Server } from "socket.io";
// import http from "http"; 
// import authRoutes from "./routes/userLoginRoutes";
// import { authenticateSocket } from "./middlewares/socketAuth";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth", authRoutes);
// io.use(authenticateSocket);
// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);
//   socket.on("message", (data) => {
//     io.emit("message", data);
//   });
// });
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const userLoginRoutes_1 = __importDefault(require("./routes/userLoginRoutes"));
const socketAuth_1 = require("./middlewares/socketAuth");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", userLoginRoutes_1.default);
io.use(socketAuth_1.authenticateSocket);
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("message", (data) => {
        io.emit("message", data);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=app.js.map