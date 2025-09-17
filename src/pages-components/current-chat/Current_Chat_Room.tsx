"use client";

import Chat_Header from "@/components/Chat_Header";
import { useCurrentChat, useCurrentMessages, useMyUserStore } from "@/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Send_Message from "./Send_Message";
import Message_Component from "@/components/Message_Component";
import Auto_Focus_Elem from "@/components/Auto_Focus_Elem";
import Preloader_Messages from "@/components/Preloader_Messages";

export default function Current_Chat_Room() {
  const { myUser } = useMyUserStore((state) => state);
  const { wsCurrent } = useCurrentChat((state) => state);
  const { uuid } = useParams();
  const [inputValue, setInputValue] = useState("");
  const messages = useCurrentMessages((state) => state.messages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wsCurrent ? setLoading(false) : setLoading(true);
  }, [wsCurrent]);

  const sendMessage = () => {
    if (!inputValue.trim() || !wsCurrent) return;
    wsCurrent.send(
      JSON.stringify({
        from: myUser?.uuid,
        to: String(uuid),
        message: inputValue,
        username: myUser?.username
      })
    );
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
