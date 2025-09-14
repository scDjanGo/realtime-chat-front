"use client";

import { useEffect, useRef } from "react";
import Users_Bar from "@/components/Users_Bar";
import { useParams } from "next/navigation";
import Current_Chat_Room from "@/pages-components/current-chat/Current_Chat_Room";
import {
  useActiveUsersStore,
  useCurrentChat,
  useMessagesStore,
  useMyUserStore,
} from "@/store";

const SERVER_URL = "wss://realtime-chat-vne1.onrender.com/ws";

export default function page() {
  const { uuid } = useParams();
  const { setMyUser } = useMyUserStore((state) => state);
  const { setCurrentChat } = useCurrentChat((state) => state);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messages = useMessagesStore((state) => state.messages);
  const clearMessages = useMessagesStore((state) => state.clearMessages);
  const addMessage = useMessagesStore((state) => state.addMessage);
  const { activeUsers, setActiveUsers, addActiveUsers } = useActiveUsersStore(
    (state) => state
  );

  useEffect(() => {
    clearMessages();
  }, []);

  // Подключение к WebSocket
  useEffect(() => {
    const ws = new WebSocket(`${SERVER_URL}/${uuid}`);

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

    setCurrentChat(ws);

    return () => {
      ws.close();
    };
  }, []);

  // автоскролл вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Users_Bar />

      {/* Chat */}
      <Current_Chat_Room messages={messages} activeUsers={activeUsers} />
    </div>
  );
}
