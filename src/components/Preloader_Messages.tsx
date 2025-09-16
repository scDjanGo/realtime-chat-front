import Skeleton_Message from "./Skeleton_Message";

const arr = [
  { id: 1, isMine: true },
  { id: 2, isMine: true },
  { id: 3, isMine: false },
  { id: 4, isMine: true },
  { id: 5, isMine: false },
  { id: 6, isMine: false },
];

export default function Preloader_Messages({
  loading,
}: {
  loading: true | false;
}) {
  return (
    loading && (
      <div className="flex-1 overflow-y-auto bg-chat-pattern p-4 space-y-3">
        {arr.map((item) => (
          <Skeleton_Message key={item.id} isMine={item.isMine} />
        ))}
      </div>
    )
  );
}
