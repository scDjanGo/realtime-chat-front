"use client";

import { useEffect } from "react";
import Users_Bar from "@/components/Sidebar_Main";
import { useParams } from "next/navigation";
import Current_Chat_Room from "@/pages-components/current-chat/Current_Chat_Room";
import {
  useActiveUsersStore,
  useCurrentChat,
  useCurrentMessages,
  useMessagesStore,
  useMyUserStore,
} from "@/store";
import { useRouter } from "next/navigation";

// const SERVER_URL = "wss://realtime-chat-vne1.onrender.com/chat";

const SERVER_URL = `wss://realtime-chat-vne1.onrender.com/chat`;

export default function page() {
  const { uuid } = useParams();
  const router = useRouter();
  const myUser = useMyUserStore((state) => state.myUser);
  const { setCurrentChat } = useCurrentChat((state) => state);
  const addMessagesC = useCurrentMessages((state) => state.addMessageC);
  const setMessagesC = useCurrentMessages((state) => state.setMessagesC);

  const clearMessages = useMessagesStore((state) => state.clearMessages);
  const { activeUsers } = useActiveUsersStore((state) => state);

  useEffect(() => {
    clearMessages();
  }, []);

  useEffect(() => {
    let currentUser = activeUsers.find((item) => item.uuid === uuid);

    if (currentUser) return;

    router.push("/chats");
  }, [activeUsers]);

  // Подключение к WebSocket
  useEffect(() => {
    if (!myUser?.uuid) return;

    const ws = new WebSocket(`${SERVER_URL}?my-uuid=${myUser.uuid}`);
    ws.onopen = () => console.log("Connected current chat");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (String(data.type) === "history") {
        setMessagesC(data.data);

        return;
      }
      if (
        (data.from === uuid && data.to === myUser.uuid) ||
        (data.from === myUser.uuid && data.to === uuid)
      ) {
        addMessagesC(data);
      }
    };

    ws.onclose = () => console.log("❌ Disconnected from server");

    setCurrentChat(ws);

    return () => {
      ws.close();
    };
  }, [myUser?.uuid]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Users_Bar />

      {/* Chat */}
      <Current_Chat_Room />
    </div>
  );
}
