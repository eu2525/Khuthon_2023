import { Chat } from "@/utils/types";

export const ChatContainer = ({ chats }: { chats: Chat[] }) => {
  return (
    <div className="flex-1 px-4 pt-4">
      {chats.map((chat, index) => (
        <ChatItem key={index} chat={chat} />
      ))}
    </div>
  );
};

const ChatItem = ({ chat }: { chat: Chat }) => {
  const { sender, message, isMe } = chat;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div>
        <p className="pl-2 text-sm text-gray-900 mb-1">{sender}</p>
        <div
          className={`max-w-[300px] rounded-lg px-3 py-2 ${
            isMe ? "bg-gray-300" : "bg-yellow-400"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};
