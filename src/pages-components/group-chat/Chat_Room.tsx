"use client";

import { useChatsWS, useMessagesStore } from "@/store";
import { useEffect, useState } from "react";
import Chat_Header from "../../components/Chat_Header";
import Send_Message from "@/pages-components/current-chat/Send_Message";
import Message_Component from "../../components/Message_Component";
import Auto_Focus_Elem from "@/components/Auto_Focus_Elem";
import Preloader_Messages from "@/components/Preloader_Messages";

export default function Chat_Room() {
  const { messages } = useMessagesStore((state) => state);
  const { wsData } = useChatsWS((state) => state);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Loader
  useEffect(() => {
    wsData ? setLoading(false) : setLoading(true);
  }, [wsData]);

  const sendMessage = () => {
    if (!inputValue.trim() || !wsData) return;
    const isAdmin = inputValue.split(" ").includes("bek229101");
    if (!isAdmin) {
      wsData.send(JSON.stringify({ type: "message", message: inputValue }));
      setInputValue("");
      return;
    }

    wsData.send(JSON.stringify({ type: "admin", message: inputValue }));
    setInputValue("");
  };

  return (
    <section className="flex-1 flex flex-col bg-gray-50">
      {/* Шапка */}
      <Chat_Header />

      {/* Сообщения */}
      {!loading && (
        <div className="flex-1 overflow-y-auto bg-chat-pattern p-4 space-y-3">
          {messages.map((msg, idx) => (
            <Message_Component key={idx} message={msg} />
          ))}
          <Auto_Focus_Elem handler={messages} />
        </div>
      )}

      {/* Preloader */}
      <Preloader_Messages loading={loading} />

      {/* Ввод */}
      <Send_Message
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
      />
    </section>
  );
}
