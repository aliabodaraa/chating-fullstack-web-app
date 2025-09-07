# Chating Fullstack Web App

A real-time chat application built with a modern tech stack, featuring both frontend and backend components for seamless messaging experiences. This application uses Socket.IO for instantaneous real-time communication and localStorage for message persistence on the client side.

![Chat App](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-18.0-green) ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.5-orange)

## 🚀 Tech Stack

### Frontend
- **React** - User interface library
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📦 Project Structure

```
chating-fullstack-web-app/
├── client/ # Frontend React application
│ ├── public/ # Static assets
│ ├── src/ # Source code
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── utils/ # Utility functions
│ │ └── types/ # TypeScript type definitions
│ ├── package.json
│ └── vite.config.ts
├── server/ # Backend Node.js application
│ ├── controllers/ # Route controllers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ ├── utils/ # Utility functions
│ ├── package.json
│ └── server.js
└── README.md
```



## 📊 System Architecture

```mermaid
flowchart TD
    subgraph Frontend [React Frontend]
        A[UI Components]
        B[State Management]
        C[API Client]
        D[LocalStorage]
    end

    subgraph Backend [Node.js Backend]
        E[Express Server]
        F[Socket.IO]
        G[Authentication]
        H[Session Management]
    end

    A <-->|HTTP Requests| E
    A <-->|WebSocket Connection| F
    A <-->|Store/Retrieve Data| D
    F <-->|Real-time Events| E
    G <-.->|User Validation| E
```
## 🔌 Data Flow


```mermaid
sequenceDiagram
    participant Client as React Client
    participant Server as Express Server
    participant Socket as Socket.IO
    participant Storage as LocalStorage

    Note over Client, Storage: Authentication Flow
    Client->>Server: HTTP POST /api/auth/login
    Server->>Server: Validate credentials
    Server-->>Client: JWT Token
    
    Note over Client, Storage: Connection Setup
    Client->>Socket: Connect with JWT
    Socket->>Server: Verify token
    Server-->>Socket: Authentication success
    
    Note over Client, Storage: Message Handling
    Client->>Socket: Send message
    Socket->>Server: Process message
    Server->>Socket: Broadcast to recipients
    Client->>Socket: Receive message
    Client->>Storage: Save message locally
```

## 👨‍💻 Author
Ali Abodaraa

## 🙏 Acknowledgments
Socket.IO for real-time capabilities

Vite team for the excellent build tool

Tailwind CSS for the utility-first CSS framework
