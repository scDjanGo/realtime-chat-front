"use client";

import { useEffect } from "react";
import {
  useActiveUsersStore,
  useChatsWS,
  useMessagesStore,
  useMyUserStore,
} from "@/store";

const SERVER_URL = "wss://realtime-chat-vne1.onrender.com/ws";
export default function layout({ children }: { children: React.ReactNode }) {
  const { setMyUser } = useMyUserStore((state) => state);
  const { activeUsers, setActiveUsers, addActiveUsers } = useActiveUsersStore(
    (state) => state
  );
  const addMessage = useMessagesStore((state) => state.addMessage);
  const { setChatsData, wsData } = useChatsWS((state) => state);

  useEffect(() => {
    const ws = new WebSocket(SERVER_URL);

    ws.onopen = () => console.log("✅ Connected to server");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "init":
          setMyUser(data.user);
          break;
        case "activeUsers":
          setActiveUsers(data.users);
          break;
        case "newUser":
          addActiveUsers([data.user]);
          break;
        case "userLeft":
          setActiveUsers(activeUsers.filter((u) => u.uuid !== data.uuid));
          break;
        case "message":
          addMessage(data);
          break;
      }
    };

    ws.onclose = () => console.log("❌ Disconnected from server");

    setChatsData(ws);

    return () => {
      ws.close();
    };
  }, []);
  return <>{children}</>;
}
