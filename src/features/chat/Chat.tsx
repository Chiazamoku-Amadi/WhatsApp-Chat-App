import ChatArea from "../../components/ChatArea";
import ChatAreaFooter from "../../components/ChatAreaFooter";
import ChatAreaHeader from "../../components/ChatAreaHeader";

const Chat = () => {
  return (
    <main className="relative flex flex-col justify-between items-start bg-[#0A141B] h-screen w-full">
      <ChatAreaHeader />
      <ChatArea />
      <ChatAreaFooter />
    </main>
  );
};

export default Chat;
