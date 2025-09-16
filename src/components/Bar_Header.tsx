"use client";

import { useActiveUsersStore } from "@/store";

export default function Bar_Header() {
  const { activeUsers } = useActiveUsersStore((state) => state);
  return (
    <div className="p-4 border-b border-gray-200 flex flex-col justify-between items-start md:block">
      <h2 className="text-lg font-semibold text-gray-800 leading-[1.1]">
        Активные пользователи
      </h2>
      <p className="text-sm text-gray-500">В сети: {activeUsers.length}</p>
    </div>
  );
}
