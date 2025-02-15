import { Socket } from "socket.io";
import { verify } from "jsonwebtoken";
export const authenticateSocket = (
  socket: Socket,
  next: (err?: any) => void
) => {
  console.log("🔍 Checking WebSocket Authentication...");

  console.log("📌 handshake.auth.token:", socket.handshake.auth?.token);
  console.log(
    "📌 handshake.headers.authorization:",
    socket.handshake.headers?.authorization
  );

  let token =
    socket.handshake.auth?.token || socket.handshake.headers?.authorization;

  if (!token) {
    console.log("❌ Authentication Failed: No Token Provided!");
    return next(new Error("Authentication error"));
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    (socket as any).user = decoded;
    console.log("✅ Authentication Successful:", decoded);
    next();
  } catch (error) {
    console.log("❌ Authentication Failed: Invalid Token", error);
    next(new Error("Authentication error"));
  }
};
