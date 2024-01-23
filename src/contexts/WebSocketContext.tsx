import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  webSocket: WebSocket | null;
  // Outras propriedades ou métodos relacionados ao WebSocketContext
}

const WebSocketContext = createContext<WebSocketContextType>({ webSocket: null });

const WebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws: WebSocket = new WebSocket('ws://localhost:3008');

    ws.addEventListener('open', (event) => {
      console.log('Conectado ao servidor WS.');
    });

    ws.addEventListener('close', (event) => {
      console.log('Conexão WS fechada.');
      setWebSocket(null);
    });

    setWebSocket(ws);

    return () => {
      // Limpar recursos ao desmontar o componente ou quando a conexão é fechada
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ webSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket deve ser usado dentro de um WebSocketProvider');
  }

  return context;
};

export { useWebSocket, WebSocketProvider };
