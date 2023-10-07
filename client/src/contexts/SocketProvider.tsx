import React, { useContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextProviderProps = {
  id: string;
  children: React.ReactNode;
};
type QueryType = {
  query: {
    id: string;
  };
};
type SocketType = Socket<any, any>;
type ConnectionStatusType = {
  connected: boolean;
  message: string;
};
type SocketContextType = {
  socket: SocketType | null;
  connectionStatus: ConnectionStatusType;
  connectedClients: string[];
  id: string;
};
type ClientsCallbackType = (result: string[]) => string[];

// const SocketContext = React.createContext<SocketContextType | null>(null);
const SocketContext = React.createContext({} as SocketContextType);

const SOCKET_URL: string = "http://localhost:8001";

export function useSocket() {
  return useContext(SocketContext);
}
export function SocketProvider({ id, children }: SocketContextProviderProps) {
  console.log("Socket Provider");

  const [socket, setSocket] = useState<SocketType | null>(null);
  let [connectionStatus, setConnectionStatus] = useState<ConnectionStatusType>({
    connected: true,
    message: "Attempting to reconnect...",
  });
  const [connectedClients, setConnectedClients] = useState<string[]>([]);

  useEffect(() => {
    const query: QueryType = { query: { id } };
    const newSocket: Socket<any, any> = io(SOCKET_URL, query);

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setConnectionStatus({ connected: true, message: "Socket connected" });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnectionStatus({ connected: false, message: "Socket disconnected" });
    });

    setSocket(newSocket);
    setConnectionStatus({
      connected: false,
      message: "Attempting to reconnect...",
    });
    return () => {
      newSocket.disconnect();
      newSocket.close();
      console.log("Disconnect And Closed The Socket");
    };
  }, [id]);
  useEffect(() => {
    // setConnectionStatus({ connected: false, message: 'Attempting to reconnect...'});
    if (socket == null) return;
    console.log(socket);
    setConnectionStatus({
      connected: false,
      message: "Attempting to reconnect...",
    });
    // let timeOut = setTimeout(() => {
    //   //retry connecting when we lose the socket connection
    //   if (!socket.connected) {
    //     socket.disconnect();
    //     console.log("Attempting to reconnect...");
    //     socket.connect();
    //   }
    // }, 300);
    socket.connect(); //Instead of previous
    socket.on("connectedClients", (clients: ClientsCallbackType) => {
      setConnectedClients(clients);
    });

    return () => {
      //clearTimeout(timeOut);
      socket.off("connectedClients");
    };
  }, [socket]);
  const value: SocketContextType = {
    socket,
    connectionStatus,
    connectedClients,
    id,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
