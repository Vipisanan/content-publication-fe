import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useNotifications(userId, onNotification) {
  const client = useRef(null);

  useEffect(() => {
    if (!userId) return;
    client.current = new Client({
      webSocketFactory: () => new SockJS("http://52.90.134.179:8083/ws"),
      onConnect: () => {
        client.current.subscribe(
          `/topic/notifications.${userId}`,
          (message) => {
            const notification = JSON.parse(message.body);
            onNotification(notification);
          }
        );
      },
      reconnectDelay: 5000,
    });

    client.current.activate();

    return () => {
      client.current.deactivate();
    };
  }, [userId, onNotification]);
}
