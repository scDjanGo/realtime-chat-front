"use client";

import { useEffect, useRef } from "react";

export default function Auto_Focus_Elem({ handler }: { handler: any }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [handler]);
  return <div ref={messagesEndRef} />;
}
