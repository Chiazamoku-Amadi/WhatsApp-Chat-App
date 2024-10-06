import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { useEffect, useRef } from "react";
import grayTick from "../assets/msg-unread-dblcheck.svg";
import blueTick from "../assets/msg-dblcheck.svg";

const ChatArea = () => {
  const allMessages = useSelector((state: RootState) => state.chat.messages);
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect for when a new message enters, it scrolls into view
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredMessages = allMessages.filter((message) =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const messages = filteredMessages.map((message) => {
    const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return (
      <div
        key={message.id}
        className={`flex justify-between items-center ${
          message.senderId === selectedUser?.id
            ? "bg-[#015D4B] self-end"
            : "bg-received-msg-bg self-start"
        } p-2 m-1 rounded w-4/5 md:w-3/5`}
      >
        <pre className="text-user whitespace-pre-wrap">{message.content}</pre>
        <div className="flex justify-center items-center self-end gap-1">
          <p className="text-[11px] text-read-msg self-end">{messageTime}</p>
          <img
            className={`${
              message.senderId !== selectedUser?.id && "hidden"
            } cursor-pointer`}
            src={message.read ? blueTick : grayTick}
            alt=""
          />
        </div>
      </div>
    );
  });

  return (
    <div
      className="border border-wa-gray-light overflow-auto h-full w-full"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10, 21, 26, 0.95), rgba(10, 21, 26, 0.95)), url('src/assets/whatsapp_bg.png')",
      }}
    >
      <div className="flex flex-col justify-end items-center py-4 px-4 md:px-16 h-auto w-full">
        {messages}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
