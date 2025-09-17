"use client";

import { useMyUserStore } from "@/store";
import { typeMessage } from "@/types/types";
import Link from "next/link";

export default function Message_Component({
  message,
}: {
  message: typeMessage;
}) {
  const { myUser } = useMyUserStore((state) => state);
  const parts = message.message.split(/(https?:\/\/[^\s]+)/g);
  return (
    <div
      className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
        message.from === myUser?.uuid
          ? "bg-green-500 text-white ml-auto rounded-br-none"
          : "bg-white border text-gray-800 rounded-bl-none"
      }`}
    >
      <span className="block text-xs opacity-60 mb-1">{message.username}</span>
      {parts.map((part, i) =>
        part.match(/^https?:\/\//) ? (
          <Link
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            {part}
          </Link>
        ) : (
          part
        )
      )}
    </div>
  );
}
