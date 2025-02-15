"use strict";
// import { Socket } from "socket.io";
// import { verify } from "jsonwebtoken";
// export const authenticateSocket = (
//   socket: Socket,
//   next: (err?: any) => void
// ) => {
//   console.log("🔍 Checking WebSocket Authentication...");
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSocket = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateSocket = (socket, next) => {
    var _a, _b, _c, _d;
    console.log("🔍 Checking WebSocket Authentication...");
    console.log("📌 handshake.auth.token:", (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token);
    console.log("📌 handshake.headers.authorization:", (_b = socket.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization);
    let token = ((_c = socket.handshake.auth) === null || _c === void 0 ? void 0 : _c.token) || ((_d = socket.handshake.headers) === null || _d === void 0 ? void 0 : _d.authorization);
    if (!token) {
        console.log("❌ Authentication Failed: No Token Provided!");
        return next(new Error("Authentication error"));
    }
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        socket.user = decoded;
        console.log("✅ Authentication Successful:", decoded);
        next();
    }
    catch (error) {
        console.log("❌ Authentication Failed: Invalid Token", error);
        next(new Error("Authentication error"));
    }
};
exports.authenticateSocket = authenticateSocket;
//# sourceMappingURL=socketAuth.js.map