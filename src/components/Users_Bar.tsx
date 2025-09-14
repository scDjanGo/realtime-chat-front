"use client";

import { useActiveUsersStore, useMyUserStore, useOpenMainBurger } from "@/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Users_Bar() {
  const {myUser} = useMyUserStore(state => state)
  const {activeUsers} = useActiveUsersStore(state => state)
  const router = useRouter();
  const { uuid } = useParams();
  const { offBurger, data: burgerMenu } = useOpenMainBurger((state) => state);

  const handleClick = (uuid: string) => {
    router.push(`/chats/${uuid}`);
    offBurger();
  };



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
        <div className="p-4 border-b border-gray-200 flex flex-col justify-between items-start md:block">
          <h2 className="text-lg font-semibold text-gray-800 leading-[1.1]">
            Активные пользователи
          </h2>
          <p className="text-sm text-gray-500">В сети: {activeUsers.length}</p>
        </div>

        <Link
          href={`/chats`}
          className={`cursor-pointer p-2 rounded-lg text-sm transition flex items-center gap-2 bg-green-500 text-white shadow-md mx-4 mt-4`}
        >
          <span>Общий чат</span>
        </Link>

        {/* Список пользователей */}
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeUsers.map((user) => (
            <li
              key={user.uuid}
              onClick={() => handleClick(user.uuid)}
              className={`cursor-pointer p-2 rounded-lg text-sm transition flex items-center gap-2
                ${
                  user.uuid === myUser?.uuid
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } ${uuid === user.uuid && "bg-green-500 text-white shadow-md"}`}
            >
              {/* Можно добавить аватар */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                {user.username[0].toUpperCase()}
              </div>
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Фоновый слой при открытом меню на мобильных */}
      {burgerMenu && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-30 z-40 md:hidden"
          onClick={offBurger}
        />
      )}
    </>
  );
}
