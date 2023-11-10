export const parseRawChat = (chatRaw: string) => {
  const chats = chatRaw?.split("\n").filter((chat) => chat !== "");

  return (
    chats?.map((chat) => {
      const match = [...chat.matchAll(/([^:]+):(.*)/gm)];
      const sender = match ? (match[0] ? match[0][1]?.trim() : "") : "";
      const message = match ? (match[0] ? match[0][2]?.trim() : "") : "";
      return {
        sender,
        message,
        isMe: sender === "나",
      };
    }) ?? []
  );
};
