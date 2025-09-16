"use client";

export default function Search_User({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart();
    setInputValue(value);
  };
  return (
    <div className={` mx-4 mt-4`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Поиск..."
        className={`duration-300 transition-all bg-gray-100 p-2 rounded-lg w-full focus:outline-0 border-[1px] border-green-200 focus:!border-green-500`}
      />
    </div>
  );
}
