export default function Skeleton_Message({ isMine }: { isMine: boolean }) {
  return (
    <div
      className={`max-w-[70%] p-3 rounded-2xl shadow-sm bg-black/30 min-h-[48px] animate-pulse ${
        isMine
          ? " text-white ml-auto rounded-br-none"
          : " text-gray-800 rounded-bl-none"
      }`}
     />
  );
}
