import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 relative overflow-hidden">
      {/* Заголовок */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center opacity-0 animate-fade-in">
        Добро пожаловать 🚀
      </h1>

      {/* Подзаголовок */}
      {/* <p className="mt-6 text-lg md:text-2xl text-gray-300 text-center max-w-2xl opacity-0 animate-fade-in-delay">
        Это главная страница вашего приложения. Здесь вы можете начать свой путь.
      </p> */}

      {/* Кнопка */}
      <div className="mt-10">
        <Link
          href="/chats"
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white text-black shadow-xl hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          Начать чатится
        </Link>
      </div>
    </div>
  );
}
