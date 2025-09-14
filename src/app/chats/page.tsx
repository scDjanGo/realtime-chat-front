import Users_Bar from "@/components/Users_Bar";
import Chat_Room from "@/components/Chat_Room";

export default function page() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar  */}
      <Users_Bar />

      {/* Chat */}
      <Chat_Room />
    </div>
  );
}
