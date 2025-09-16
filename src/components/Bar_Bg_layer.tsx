"use client";

import { useOpenMainBurger } from "@/store";

export default function Bar_Bg_layer() {
  const { offBurger, data: burgerMenu } = useOpenMainBurger((state) => state);
  return (
    burgerMenu && (
      <div
        className="fixed inset-0 bg-black/30 bg-opacity-30 z-40 md:hidden"
        onClick={offBurger}
      />
    )
  );
}
