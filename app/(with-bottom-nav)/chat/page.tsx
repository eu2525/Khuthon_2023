import { ChatListItem } from "@/components/chat/chat-list-item";

export default function ChatPage() {
  return (
    <div>
      <header className="p-4">
        <h1 className="text-xl">Chat</h1>
      </header>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </div>
  );
}
