"use client";

import { useActiveUsersStore, useChatsWS, useMessagesStore, useMyUserStore, useOpenMainBurger } from "@/store";
import { typeMessage, typeUser } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Chat_Room() {
  const {messages} = useMessagesStore(state => state)
  const {wsData} = useChatsWS(state => state)
  const {activeUsers} = useActiveUsersStore(state => state)
  const {myUser} = useMyUserStore(state => state)
  const [input, setInput] = useState("");
  const burgerMenu = useOpenMainBurger((state) => state.data);
  const toggleBurger = useOpenMainBurger((state) => state.toggleBurger);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !wsData) return;
    wsData.send(JSON.stringify({ type: "message", message: input }));
    setInput("");
  };

  return (
    <section className="flex-1 flex flex-col bg-gray-50">
      {/* Шапка */}
      <div className="flex items-center justify-between p-4 bg-green-600 text-white shadow-md">
        <h2 className="text-lg font-semibold">Общий чат</h2>

        <div className="flex items-center gap-[12px]">
          <span className="text-sm opacity-90">
            Участников: {activeUsers.length}
          </span>
          <button
            onClick={toggleBurger}
            className="text-gray-800 text-2xl  block md:hidden cursor-pointer"
          >
            {burgerMenu ? <FiX color="white" /> : <FiMenu color="white" />}
          </button>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto bg-chat-pattern p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
              msg.from === myUser?.uuid
                ? "bg-green-500 text-white ml-auto rounded-br-none"
                : "bg-white border text-gray-800 rounded-bl-none"
            }`}
          >
            <span className="block text-xs opacity-60 mb-1">
              {msg.username}
            </span>
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ввод */}
      <div className="p-4 flex bg-white border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Введите сообщение..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition"
        >
          ➤
        </button>
      </div>
    </section>
  );
}
