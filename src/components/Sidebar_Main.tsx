"use client";

import { useActiveUsersStore, useOpenMainBurger } from "@/store";
import { typeUser } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search_User from "./Search_User";
import User_Button from "./User_Button";
import Bar_Bg_layer from "./Bar_Bg_layer";
import Bar_Header from "./Bar_Header";

export default function Sidebar_Main() {
  const { activeUsers } = useActiveUsersStore((state) => state);
  const { data: burgerMenu } = useOpenMainBurger((state) => state);
  const [users, setUsers] = useState<typeUser[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!activeUsers) return;
    setUsers(activeUsers);
  }, [activeUsers]);

  useEffect(() => {
    if (!inputValue) {
      setUsers(activeUsers);
      return;
    }

    setUsers(
      activeUsers.filter((item) =>
        item.username.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  return (
    <>
      {/* Сайдбар */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200
          w-64 z-50 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:flex md:flex-col md:w-1/4 max-w-[320px]
          ${burgerMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Шапка */}
        <Bar_Header />

        <Link
          href={`/chats`}
          className={`cursor-pointer p-2 rounded-lg text-sm transition flex items-center gap-2 bg-green-500 text-white shadow-md mx-4 mt-4`}
        >
          <span>Общий чат</span>
        </Link>

        <Search_User inputValue={inputValue} setInputValue={setInputValue} />

        {/* Список пользователей */}
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {users.map((user) => (
            <User_Button key={user.uuid} user={user} />
          ))}
        </ul>
      </aside>

      {/* Фоновый слой при открытом меню на мобильных */}
      <Bar_Bg_layer />
    </>
  );
}
