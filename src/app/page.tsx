import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-gray-900 px-6">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-100 to-green-200 animate-gradientShift"></div>
      <div className="absolute w-[400px] h-[400px] bg-green-200 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px] animate-pulseCustom"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-200 rounded-full blur-3xl opacity-30 bottom-[-80px] right-[-50px] animate-pulseCustom"></div>

      {/* Контент */}
      <h1 className="text-3xl md:text-6xl font-extrabold text-center text-green-600 relative z-10">
        Добро пожаловать в IN-CHAT 👋
      </h1>

      <p className="mt-4 text-base md:text-xl text-gray-700 text-center max-w-xl relative z-10">
        Общайтесь легко и безопасно. IN-CHAT — это место, где разговоры
        начинаются просто, а общение становится ближе 🌿
      </p>

      <div className="mt-10 relative z-10">
        <Link
          href="/chats"
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-green-500 text-white shadow-xl hover:scale-105 hover:bg-green-400 transition-all duration-500 ease-in-out"
        >
          Начать общение 🚀
        </Link>
      </div>

      <Link
        href="https://github.com/scDjanGo/realtime-chat-front"
        className=" text-[12px] font-[500] fixed bottom-[20px] left-[20px] z-10 bg-green-500 rounded-[8px] p-[6px_12px] text-white"
      >
        Как пользоватся ?
      </Link>

      <Link
        href="https://github.com/scDjanGo"
        className="text-gray-500 text-[12px] font-[500] fixed bottom-[20px] right-[20px] z-10"
      >
        сделано: scDjanGo
      </Link>
    </div>
  );
}
