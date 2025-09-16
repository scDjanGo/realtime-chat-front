"use client";

import { useActiveUsersStore, useOpenMainBurger } from "@/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Chat_Header() {
  const { uuid } = useParams();
  const { activeUsers } = useActiveUsersStore((state) => state);
  const burgerMenu = useOpenMainBurger((state) => state.data);
  const toggleBurger = useOpenMainBurger((state) => state.toggleBurger);
  return (
    <div className="flex items-center justify-between p-4 bg-green-600 text-white shadow-md">
      <Link href={`/chats`} className="text-lg font-semibold">
        Общий чат
      </Link>

      {activeUsers.find((user) => user.uuid === uuid) && (
        <p className="text-lg font-semibold text-center leading-[1.1]">
          <span className={`text-[14px]`}>Чат с:</span>
          <br />
          {activeUsers.find((user) => user.uuid === uuid)?.username}
        </p>
      )}

      <div className="flex items-center gap-[12px]">
        <span className="text-sm opacity-90">Онлайн: {activeUsers.length}</span>
        <button
          onClick={toggleBurger}
          className="text-gray-800 text-2xl  block md:hidden cursor-pointer relative !z-[100]"
        >
          {burgerMenu ? <FiX color="white" /> : <FiMenu color="white" />}
        </button>
      </div>
    </div>
  );
}
