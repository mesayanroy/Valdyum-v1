import { useState, useEffect, useRef, useCallback } from 'react';
import { useSceneStore } from './store/useSceneStore';

interface UseWebSocketOptions {
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onMessage?: (data: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export const useWebSocket = (url: string, options?: UseWebSocketOptions) => {
  const {
    reconnectAttempts = 10,
    reconnectDelay = 1000,
    onMessage,
    onOpen,
    onClose,
    onError,
  } = options || {};

  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const setWsConnectionState = useSceneStore((state) => state.setWsConnectionState);
  const connectionState = useSceneStore((state) => state.wsConnectionState);

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnectionState('connected');
        attemptsRef.current = 0;
        if (onOpen) onOpen();
      };

      ws.onmessage = (event) => {
        setLastMessage(event.data);
        if (onMessage) onMessage(event.data);
      };

      ws.onclose = () => {
        if (onClose) onClose();
        
        if (attemptsRef.current < reconnectAttempts) {
          setWsConnectionState('reconnecting');
          const delay = Math.min(reconnectDelay * Math.pow(2, attemptsRef.current), 30000);
          reconnectTimeoutRef.current = setTimeout(() => {
            attemptsRef.current += 1;
            connect();
          }, delay);
        } else {
          setWsConnectionState('disconnected');
        }
      };

      ws.onerror = (error) => {
        if (onError) onError(error);
      };
    } catch (err) {
      setWsConnectionState('disconnected');
    }
  }, [url, reconnectAttempts, reconnectDelay, onMessage, onOpen, onClose, onError, setWsConnectionState]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((data: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  const retry = useCallback(() => {
    attemptsRef.current = 0;
    setWsConnectionState('reconnecting');
    connect();
  }, [connect, setWsConnectionState]);

  return { send, connectionState, lastMessage, retry };
};
