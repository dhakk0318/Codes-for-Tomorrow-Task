# Socket.IO Authentication & Real-Time Messaging

This project implements authentication and real-time bidirectional communication between clients and servers using Socket.IO. It includes JWT-based authentication, message broadcasting, and session management.

## Features
- **JWT Authentication for WebSocket connections**
- **User session management (Single active session per user)**
- **Real-time bidirectional communication using Socket.IO**
- **Message broadcasting using namespaces/rooms**
- **REST API integration for authentication**

---

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) or another Prisma-supported database

### Steps to Run
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```env
   JWT_SECRET=your_super_secret_key
   DATABASE_URL=your_database_url
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the server:
   ```sh
   npm start
   ```

---

## API Endpoints
### Authentication Endpoints
| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login and get a token |
| POST   | /api/auth/logout   | Logout user |

---

## WebSocket Events
| Event     | Description |
|-----------|------------|
| `message` | Send & receive messages |

### Connecting with Authentication
To connect, send a valid JWT token:
```js
const socket = io("http://localhost:3000", {
    auth: { token: "your_jwt_token" }
});
```

---

## Testing
### Using Postman for WebSocket Testing
1. Open **Postman** and create a **WebSocket Request** (`ws://localhost:3000`).
2. Add `Authorization: Bearer <token>` in headers.
3. Send a message:
   ```json
   {
     "event": "message",
     "data": "Hello!"
   }
   ```

---

## Contributing
Feel free to submit a PR or open an issue if you have suggestions for improvements!

---

## License
This project is licensed under the MIT License.

