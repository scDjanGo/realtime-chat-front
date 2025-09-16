"use client";

export default function Send_Message({
  inputValue,
  setInputValue,
  sendMessage,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}) {
  return (
    <div className="p-4 flex bg-white border-t border-gray-200">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
  );
}
