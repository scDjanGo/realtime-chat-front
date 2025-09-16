import { useMyUserStore, useOpenMainBurger } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { typeUser } from "@/types/types";

export default function User_Button({ user }: { user: typeUser }) {
  const { uuid } = useParams();
  const router = useRouter();
  const { myUser } = useMyUserStore((state) => state);
  const { offBurger, data: burgerMenu } = useOpenMainBurger((state) => state);
  const handleClick = (uuid: string) => {
    router.push(`/chats/${uuid}`);
    offBurger();
  };

  return (
    <li
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
  );
}
