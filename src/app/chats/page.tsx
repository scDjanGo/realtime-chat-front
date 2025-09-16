import Sidebar_Main from "@/components/Sidebar_Main";
import Chat_Room from "@/pages-components/group-chat/Chat_Room";

export default function page() {
  return (
    <div className="flex h-[100dvh] bg-gray-100">
      {/* Sidebar  */}
      <Sidebar_Main />

      {/* Chat */}
      <Chat_Room />
    </div>
  );
}
